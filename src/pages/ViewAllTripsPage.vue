<template>
  <div class="fahrten-container">
    <!-- Filter Bar -->
    <div class="filter-bar">
      <input type="date" v-model="filters.date" placeholder="Datum auswählen" class="filter-input"
        title="Filtere ab einem spezifischen Datum." />
      <select v-model="filters.status" class="filter-select"
        title="Wähle den Status der Fahrt: Offen, Suche Fahrer oder andere.">
        <option value="">Jeglicher Status</option>
        <option value="Offen für Mitfahrer">Offen für Mitfahrer</option>
        <option value="Suche Fahrer">Suche Fahrer</option>
      </select>
      <input type="text" v-model="filters.start" placeholder="Abreiseort" class="filter-input"
        title="Gib den Abreiseort ein, um die Suche einzugrenzen." />
      <input type="text" v-model="filters.end" placeholder="Zielort" class="filter-input"
        title="Gib den Zielort ein, um die Suche einzugrenzen." />
      <button @click="applyFilters" class="filter-button" title="Klicke, um die Filter anzuwenden.">Filtern</button>
      <button @click="clearFilters" class="filter-clear" title="Setze alle Filter zurück.">Zurücksetzen</button>
      <button @click="toggleAdvancedFilter" class="filter-advanced" title="Zeige weitere Filteroptionen an.">
        Erweiterter Filter
      </button>
    </div>

    <!-- Erweiterte Filter-Leiste -->
    <div v-if="showAdvancedFilter" class="advanced-filter-bar">
      <input type="date" v-model="advancedFilters.exactDate" placeholder="Exaktes Datum" class="filter-input"
        title="Hier kanst du nach einem exakten Datum filtern" />
      <input type="number" v-model="advancedFilters.minSeats" placeholder="Min. Plätze" class="filter-input" />
      <input type="text" v-model="advancedFilters.stopover" placeholder="Zwischenziel" class="filter-input" />
      <p>Zum sortieren der Tabelle, einfach auf den jeweiligen Header der Spalte klicken</p>
    </div>

    <!-- Table Section -->
    <div class="fahrten-section">
      <h2 class="fahrten-heading">Alle anstehenden Fahrten</h2>
      <table class="fahrten-table">
        <thead>
          <tr>
            <th @click="sortTable('ride_date')">Datum</th>
            <th @click="sortTable('ride_time')">Uhrzeit</th>
            <th @click="sortTable('start_string')">Abreiseort</th>
            <th @click="sortTable('end_string')">Zielort</th>
            <th @click="sortTable('status')">Status</th>
            <th @click="sortTable('available_seats')">Plätze</th>
            <th>Ich möchte mit</th>
            <th>Fahrt auf der Karte einsehen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ride in filteredRides" :key="ride.id">
            <td>{{ ride.ride_date }}</td>
            <td>{{ ride.ride_time }}</td>
            <td>{{ ride.start_string }}</td>
            <td>{{ ride.end_string }}</td>
            <td>{{ ride.status }}</td>
            <td>{{ ride.available_seats }}</td>
            <td v-if="ride.status == 'Offen für Mitfahrer' && ride.available_seats > 0"> Fahrer kontaktieren</td>
            <td v-else>Ich suche auch noch einen Fahrer</td>
            <td> <router-link
                :to="`/maps?start=${ride.start_point.coordinates}&end=${ride.end_point.coordinates}`">
                Karte
              </router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/services/supabase';

export default {
  name: "ViewAllTripsPage",
  data() {
    return {
      allRides: [],
      filters: {
        date: "",
        status: "",
        start: "",
        end: "",
      },
      filteredRides: [],
      showAdvancedFilter: false,
      advancedFilters: {
        exactDate: "",
        minSeats: "",
        stopover: "",
      },
    };
  },

  async mounted() {
    const { data: rides, error } = await supabase
      .from('rides')
      .select("*");

    if (!error) {
      this.allRides = rides;
      this.filteredRides = rides;
    }

    console.log(this.allRides[1].start_point.coordinates)

  },

  methods: {
    sortTable(column) {
      // Wenn dieselbe Spalte erneut geklickt wird, Sortierrichtung umkehren
      if (this.currentSort === column) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        // Neue Spalte sortieren, Standard: aufsteigend
        this.currentSort = column;
        this.currentSortDir = 'asc';
      }

      // Sortierlogik anwenden
      this.filteredRides.sort((a, b) => {
        let aValue = a[column];
        let bValue = b[column];

        // Für Datum oder Zeit als JavaScript-Date-Objekt umwandeln, wenn notwendig
        if (column === 'ride_date' || column === 'ride_time') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        // Sortierlogik
        if (aValue < bValue) {
          return this.currentSortDir === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.currentSortDir === 'asc' ? 1 : -1;
        }
        return 0; // Gleichstand
      });
    },
    clearFilters() {
      this.filters = {
        date: "",
        status: "",
        start: "",
        end: "",
      };
      this.filteredRides = [...this.allRides];
    },
    toggleAdvancedFilter() {
      this.showAdvancedFilter = !this.showAdvancedFilter;
    },
    applyFilters() {
      this.filteredRides = this.allRides.filter((ride) => {
        return (
          (!this.filters.date || ride.ride_date >= this.filters.date) &&
          (!this.filters.status || ride.status === this.filters.status) &&
          (!this.filters.start || ride.start_string.includes(this.filters.start)) &&
          (!this.filters.end || ride.end_string.includes(this.filters.end)) &&
          (!this.advancedFilters.exactDate || ride.ride_date === this.advancedFilters.exactDate) &&
          (!this.advancedFilters.minSeats || ride.available_seats >= this.advancedFilters.minSeats) &&
          (!this.advancedFilters.stopover || ride.stopovers?.includes(this.advancedFilters.stopover))
        );
      });
    },
  },
};
</script>

<style scoped>
.advanced-filter-bar {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  background-color: #eaf4f1;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.filter-advanced {
  padding: 10px 20px;
  background-color: #006b4c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.filter-advanced:hover {
  background-color: #004c3a;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filter-input,
.filter-select {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 180px;
  outline: none;
  transition: border-color 0.3s ease;
}

.filter-input:focus,
.filter-select:focus {
  border-color: #009260;
}

.filter-button {
  padding: 10px 20px;
  background-color: #009260;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #007b4c;
}

.filter-clear {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.filter-clear:hover {
  background-color: #c0392b;
}

.fahrten-container {
  padding-bottom: 7%;
}

.fahrten-section {
  max-width: 1300px;
  margin: 40px auto 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.fahrten-heading {
  font-size: 20px;
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
}

.fahrten-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.fahrten-table th,
.fahrten-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.fahrten-table th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
}

.fahrten-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.fahrten-table tr:hover {
  background-color: #e9e9e9;
}

@media (max-width: 600px) {
  .fahrten-table {
    font-size: 12px;
  }

  .fahrten-table th,
  .fahrten-table td {
    padding: 5px;
  }
}
</style>
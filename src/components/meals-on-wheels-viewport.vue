<template>
  <div class="base">
    <div class="titles">
      <div class="client">
        <div class="name">Forename</div>
        <div class="name">Surname</div>
        <div class="address">Address</div>
      </div>
      <div class="days">
        <div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
      </div>
    </div>
    <Searchbar
      place-holder-text="Search for clients..."
      @search-value="FilterHandler"
    />
    <div class="info" ref="info">
      <div
        class="row"
        v-for="(client, i) in filterClient"
        :key="i"
        :class="{ selected: isSelected(i) }"
        @click="selecetClient(i)"
      >
        <div class="client">
          <div class="name">{{ client.forename }}</div>
          <div class="name">{{ client.surname }}</div>
          <div class="address">{{ client.address }}</div>
        </div>
        <div class="days">
          <div
            class="day"
            v-for="(day, j) in client.days"
            :key="clients.length + j"
          >
            <p>M: {{ day.main }}</p>
            <p>V: {{ day.veg }}</p>
            <p>S: {{ day.soup }}</p>
            <p>P: {{ day.pudding }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep, isEqual } from 'lodash';
export default {
  name: 'MealsOnWheelsViewport',
  components: {
    Searchbar: () => import('../components/search-bar')
  },
  props: {
    weekDate: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    },
    currentClients: { type: Array, required: true }
  },
  computed: {
    filterClient() {
      return this.clients.filter(
        client =>
          client.forename.toLowerCase().includes(this.filter.toLowerCase()) ||
          client.surname.toLowerCase().includes(this.filter.toLowerCase())
      );
    }
  },
  data() {
    return {
      filter: '',
      clients: [],
      weekInfo: {},
      cache: {},
      selectedClient: {}
    };
  },
  watch: {
    weekDate: function() {
      this.getWeek();
    },
    currentClients: function() {
      this.clients = this.currentClients;
    }
  },
  methods: {
    FilterHandler(value) {
      this.filter = value;
    },
    getClients() {
      this.clients = [];
      this.weekInfo.data.forEach(client => {
        this.$http
          .get(`/clients/${client.id}`)
          .then(Response => {
            if (!('error' in Response.data)) {
              Response.data.days = client.days;
              this.clients.push(Response.data);
            }
          })
          .catch(e => {
            this.$toast.open({ message: e, type: 'error', position: 'top' });
          });
      });
      this.$emit('clients-changed', this.clients);
    },
    getWeek() {
      if (this.weekDate.start != null) {
        let date = this.weekDate.start
          .toLocaleDateString('en-GB')
          .split('/')
          .join('-');
        this.$http
          .get(`weeks?date=${date}`)
          .then(Response => {
            this.weekInfo = Response.data;
            this.cache = cloneDeep(this.weekInfo);
            this.getClients();
          })
          .catch(e => {
            this.$toast.open({ message: e, type: 'error', position: 'top' });
          });
      }
    },
    isSelected(index) {
      return this.selectedClient == this.clients[index];
    },
    selecetClient(index) {
      if (this.selectedClient == this.clients[index]) {
        this.selectedClient = {};
      } else {
        this.selectedClient = this.clients[index];
      }
      this.$emit('client-change', this.selectedClient);
    },
    scrollClients() {
      setTimeout(() => {
        this.$refs.info.scrollTop = this.$refs.info.scrollHeight;
      });
    },
    refresh() {
      this.getWeek();
    },
    save() {
      this.checkForchange() ? this.addNewClients() : null;
      this.$http
        .put('/weeks', { ...this.weekInfo })
        .then(Response => {
          if ('complete' in Response.data) {
            setTimeout(() => {
              this.$toast.open({
                message: 'Saved!',
                type: 'success',
                position: 'top'
              });
            }, 1000);
            this.cache = cloneDeep({ ...this.weekInfo });
          } else {
            this.$toast.open({
              message: Response.data,
              type: 'warning',
              position: 'top'
            });
          }
        })
        .catch(e => {
          this.$toast.open({
            message: e,
            type: 'error',
            position: 'top'
          });
        });
    },
    checkForchange() {
      let check = this.clients.map(
        client => this.weekInfo.data.filter(a => a.id == client.id).length > 0
      );
      if (check.includes(false)) {
        return true;
      }
      if (!isEqual(this.weekInfo, this.cache)) {
        return true;
      }
      return false;
    },
    addNewClients() {
      let clients = this.clients.map(client =>
        this.weekInfo.data.filter(a => a.id == client.id).length < 1
          ? client
          : null
      );
      clients.forEach(client => {
        if (client != null) {
          let obj = {};
          obj.days = client.days;
          obj.id = client.id;
          this.weekInfo.data.push(obj);
        }
      });
    },
    deleteClient() {
      this.$http
        .delete('/weeks', {
          data: {
            WeekStartDate: this.weekInfo.startDate,
            ClientId: this.selectedClient.id
          }
        })
        .then(Response => {
          if ('message' in Response.data) {
            this.$toast.open({
              message: 'Client deleted from week',
              type: 'success',
              position: 'top'
            });
            this.refresh();
            this.selected = {};
          } else {
            this.$toast.open({
              message: Response.data,
              type: 'warning',
              position: 'top'
            });
          }
        })
        .catch(e => {
          this.$toast.open({
            message: e,
            type: 'error',
            position: 'top'
          });
        });
    }
  },
  mounted() {
    this.getWeek();
    this.$emit('client-change', this.selectedClient);
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  height: 100%;
  overflow-y: hidden;
}
.titles {
  display: flex;
  background-color: $secondary;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: $text;
  padding: 1rem 0;
}
.days {
  display: flex;
  width: 60%;
  .day {
    display: flex;
    width: 20%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    p {
      border-radius: 6px;
      background-color: darken($primary, 5);
      padding: 0.5rem 1rem;
      margin: 0.5rem;
    }
  }
}
.client {
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-content: center;
    text-align: center;
  }
  .name {
    width: 20%;
  }
  .address {
    width: 60%;
  }
}
.info {
  @include transition;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  background-color: $primary;
  color: $text;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  overflow: auto;
  height: 100%;
  .row {
    display: flex;
    &:nth-child(odd) {
      background-color: lighten($primary, 5);
    }
    &:hover {
      cursor: pointer;
      background-color: darken($blue, 5);
    }
  }
  .selected {
    background-color: $blue !important;
    &:hover {
      background-color: $blue;
    }
  }
}
</style>

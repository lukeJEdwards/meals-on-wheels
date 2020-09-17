<template>
  <div class="base">
    <div class="titles">
      <div class="client title"><div>Clients</div></div>
      <div class="delivers title"><div>Deliver</div></div>
    </div>
    <div class="titles">
      <div class="client title sub">
        <div class="name">Forname</div>
        <div class="name">Surname</div>
        <div class="address">Address</div>
      </div>
      <div class="delivers title sub"></div>
    </div>
    <div class="info">
      <div v-if="HasClientsAndDelivers">
        <div class="row" v-for="(row, i) in deliversClients" :key="i">
          <div class="clients">
            <div
              class="client"
              v-for="(client, j) in row.clients"
              :key="j + 1000"
            >
              <div class="name">{{ client.forename }}</div>
              <div class="name">{{ client.surname }}</div>
              <div class="address">{{ client.address }}</div>
            </div>
          </div>
          <div class="delivers">{{ row.deliver }}</div>
        </div>
      </div>
      <div class="no-items" v-if="noDelivers">
        <p>No delivers picked</p>
      </div>
      <div class="no-items" v-if="noClients">
        <p>No Clients for this day</p>
      </div>
    </div>
  </div>
</template>

<script>
import { isEqual, cloneDeep } from 'lodash';
export default {
  name: 'DeliveriersWeek',
  props: {
    delivers: { type: Array, required: true },
    currentWeek: { type: Object, required: true },
    currentDay: { type: Number, required: true }
  },
  computed: {
    noDelivers() {
      return this.delivers.length < 1 && this.getDayClients.length > 0;
    },
    noClients() {
      return this.getDayClients.length < 1;
    },
    HasClientsAndDelivers() {
      return this.delivers.length > 0 && this.getDayClients.length > 0;
    },
    getDayClients() {
      return this.clients.filter(
        client =>
          client.days[this.currentDay].main > 0 ||
          client.days[this.currentDay].veg > 0 ||
          client.days[this.currentDay].soup > 0 ||
          client.days[this.currentDay].pudding > 0
      );
    }
  },
  data() {
    return {
      deliversClients: [],
      clients: [],
      deliveryWeek: {},
      cache: {}
    };
  },
  methods: {
    getClients() {
      this.clients = [];
      this.currentWeek.data.forEach(client => {
        this.$http
          .get(`/clients/${client.id}`)
          .then(Response => {
            let newClient = { ...Response.data };
            newClient.days = client.days;
            this.clients.push(newClient);
          })
          .catch(e => {
            this.$toast.open({ message: e, type: 'error', position: 'top' });
          });
      });
    },
    getWeek() {
      this.$http
        .get(`/deliveries/${this.currentWeek.startDate}`)
        .then(Response => {
          this.deliveryWeek = Response.data;
          this.cache = cloneDeep(Response.data);
          this.$emit(
            'delivery-change',
            this.deliveryWeek.days[this.currentDay].delivers
          );
        })
        .catch(e => {
          this.$toast.open({ message: e, type: 'error', position: 'top' });
        });
    },
    chunkify(a, n) {
      if (n < 2) return [a];
      var len = a.length,
        out = [],
        i = 0,
        size;
      if (len % n === 0) {
        size = Math.floor(len / n);
        while (i < len) {
          out.push(a.slice(i, (i += size)));
        }
      } else {
        while (i < len) {
          size = Math.ceil((len - i) / n--);
          out.push(a.slice(i, (i += size)));
        }
      }
      return out;
    },
    PairClientDeliver() {
      this.deliversClients = [];
      let arr = this.chunkify(this.getDayClients, this.delivers.length);
      let obj = {};
      for (let i = 0; i < this.delivers.length; i++) {
        obj.deliver = this.delivers[i];
        obj.clients = arr[i];
        this.deliversClients.push(obj);
        obj = {};
      }
    },
    save() {
      this.$http
        .put('/deliveries', { ...this.deliveryWeek })
        .then(Response => {
          if ('complete' in Response.data) {
            this.$toast.open({
              message: 'Saved!',
              type: 'success',
              position: 'top'
            });
            this.cache = cloneDeep({ ...this.deliveryWeek });
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
    refresh() {
      this.getClients();
      this.getWeek();
      this.PairClientDeliver();
    },
    saveCheck() {
      return isEqual(this.cache, this.deliveryWeek);
    }
  },
  watch: {
    currentWeek() {
      this.getClients();
      this.getWeek();
      this.PairClientDeliver();
    },
    delivers() {
      this.deliveryWeek.days[this.currentDay].delivers = this.delivers;
      this.PairClientDeliver();
    },
    currentDay() {
      this.PairClientDeliver();
      this.$emit(
        'delivery-change',
        this.deliveryWeek.days[this.currentDay].delivers
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~styles/colours';
@import '~styles/mixins';
.base {
  @include transition;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: $primary;
  margin-top: 1rem;
  color: $text;
  box-shadow: 3px 5px 5px 0px rgba(0, 0, 0, 0.2);
}
.titles {
  display: flex;
  justify-content: center;
  background-color: $secondary;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    font-size: 1.25rem;
  }
  .sub {
    font-size: 1rem;
    border-bottom: none;
    padding: 0;
    background-color: darken($primary, 5);
  }
}
.client {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 70%;
}
.delivers {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
}
.name {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  padding: 0.5rem 0;
}
.address {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  padding: 0.5rem 0;
}
.info {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 0;
  flex-grow: 1;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  .row {
    display: flex;
    padding: 1.5rem 0;
  }
  .row:nth-child(even) {
    background-color: lighten($primary, 5);
  }
}
.clients {
  width: 70%;
  display: flex;
  flex-direction: column;
  color: $text;
  .client {
    width: 100%;
  }
}
.no-items {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
}
</style>

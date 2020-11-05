<template>
  <div class="base">
    <div class="titles">
      <div class="client title"><div>Clients</div></div>
      <div class="delivers title"><div>Deliverers</div></div>
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
export default {
  name: 'DeliveriersWeek',
  props: {
    currentWeek: { type: Object, required: true },
    currentDay: { type: Number, required: true }
  },
  computed: {
    delivers() {
      if (this.haveData) {
        return this.currentWeek.delivers[this.currentDay].delivers;
      } else {
        return null;
      }
    },
    noClients() {
      return this.getDayClients.length < 1;
    },
    noDelivers() {
      return !this.noClients && this.delivers.length < 1;
    },
    getDayClients() {
      if (this.haveData) {
        return this.currentWeek.data.filter(client =>
          this.hasMeal(client.days[this.currentDay])
        );
      } else {
        return [];
      }
    },
    haveData() {
      return Object.keys(this.currentWeek).length > 0;
    }
  },
  data() {
    return {
      deliversClients: []
    };
  },
  watch: {
    currentWeek: {
      handler() {
        if (this.haveData) {
          this.PairClientDeliver();
        }
      },
      deep: true
    },
    currentDay() {
      if (this.haveData) {
        this.PairClientDeliver();
      }
    },
    deliversClients: {
      handler() {
        this.$emit('pairing-changed', this.deliversClients);
      }
    }
  },
  methods: {
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
    async PairClientDeliver() {
      this.deliversClients = [];
      let arr = this.chunkify(this.getDayClients, this.delivers.length);
      let obj = {};
      for (let i = 0; i < this.delivers.length; i++) {
        obj.deliver = await this.getDeliver(this.delivers[i]);
        obj.clients = arr[i];
        this.deliversClients.push(obj);
        obj = {};
      }
    },
    hasMeal(meals) {
      return meals.main > 0 || meals.veg > 0 || meals.soup > 0;
    },
    async getDeliver(id) {
      try {
        const Response = await this.$http.get(`/delivers/${id}`);
        return Response.data.name;
      } catch (err) {
        console.log(err);
      }
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

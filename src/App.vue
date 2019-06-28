<template>
  <div id="app">
    
<section class="pos">
  <div class="section__container container">
    <table>
      <thead>
        <tr class="section__header">
          <th>
            <div>Name</div>
          </th>
          <th>
            <div>Price</div>
          </th>
          <th>
            <div>Market Cap</div>
          </th>
          <th>
            <div>Volume (24hr)</div>
          </th>
        </tr>
      </thead>
      <tbody>

       <tr v-for="p in rev">
           <td>{{ p.name }}</td>
           <td>{{ parseFloat(p.priceUsd) | float }}</td>
           <td>{{ parseFloat(p.marketCapUsd) | float }}</td>
           <td>{{ parseFloat(p.volumeUsd24Hr) | float }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

  </div>
</template>

<script>

import axios from 'axios'

export default {
  
  data () {
    return {
      info: []
    }
  },
  mounted() {
    axios
      .get('https://api.coincap.io/v2/assets')
      .then(response => (this.info = response.data.data));
  },

  computed: {
    
    rev: function () {
        return  _.orderBy(this.info,['marketCapUsd'], ['desc']),
                _.slice(this.info, 0, 15)
    }
  },

  filters: {
    float: function (value) {
        return value.toFixed(3);
    }
  }
 
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

section {
  position: relative;
  padding-top: 37px;
  background: #500;
  top: 20px;
}
section.pos {
  margin: 0 auto;
  width: 950px;
}
.section__container {
  overflow: hidden;
  height: 500px;
}
.section__container:hover {
  overflow: auto;
  height: 500px;
}
table {
  border-spacing: 0;
  width: 100%;
}
td {
  border-left: 1px solid #eee;
}
td,th {
  border-bottom: 1px solid #eee;
  background: #ddd;
  color: #000;
  padding: 10px 18px;
}
th {
  height: 0;
  line-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  color: transparent;
  border: none;
}
th div {
  position: absolute;
  background: transparent;
  color: #fff;
  padding: 9px 18px;
  top: 0;
  margin-left: -18px;
  line-height: normal;
  border-left: 1px solid #800;
}
th:first-child div {
  border: none;
}



@media (max-width: 950px) {

th:nth-child(3) {
   display: none;
}
td:nth-child(3) {
   display: none;
}
th:nth-child(4) {
   display: none;
}
td:nth-child(4) {
   display: none;
}
section.pos {
   width: 500px;
}
}

@media (max-width: 500px) {

.section__container {
   height: 400px;
}
.section__container:hover {
   height: 400px;
}
section.pos {
   width: 300px;
}
td,th {
   font-size: 12px;
}
  
}

</style>

<template>
  <div id="app">
    
    <vue-luban-menu :z-index="100" :apps="apps" :favorites="favorites" @favorite-remove="removeFavorite" @favorite-add="addFavorite">
      <div class="trigger">
        <img src="./icon-trigger.png">
      </div>
    </vue-luban-menu>

  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      favorites: [],
      apps: [
        {
          title: '应用开发',
          appInstances: [
            { title: '数据质量开发' },
            { title: '数据服务开发' },
            { title: 'steamSQL' },
            { title: '工作流开发' },
          ]
        },
        {
          title: '数据分析&可视化',
          appInstances: [
            { title: 'Scripts' },
            { title: 'Visualis' },
            { title: 'Datav' },
            { title: 'EasyIED' },
          ]
        }
      ],
    }
  },
  methods: {
    removeFavorite(item) {
      console.log('outer remove', item);
    },
    addFavorite(item) {
      console.log('outer add', item)
    }
  }
}
</script>

<style lang="scss">
html,body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.trigger {
  display: block;
  width: 40px;
  height: 40px;
  background: #0B203C;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #061528;
  }
  img {
    width: 24px;
    height: 24px;
    margin-top: 8px;
  }
}
</style>

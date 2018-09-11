// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App' import router from './router'

Vue.config.productionTip = false

// /* eslint-disable no-new */ new Vue({   el: '#app',   router,   render (h) {
//    return h(App)   } })

// const AppLayout = {
//   template: `
//     <div className="container">
//       <header>
//         <slot name="header"></slot>
//       </header>
//       <main><slot>默认内容</slot></main>
//       <footer>
//         <slot name="footer"></slot>
//       </footer>
//     </div>
//   `
// }

// /* eslint-disable no-new */
// new Vue({
//   components: {
//     AppLayout
//   },
//   template: `
//     <div>
//       <app-layout>
//         <h1 slot="header">{{title}}</h1>
//         <p>{{msg}}</p>
//         <p slot="footer">{{footer}}</p>
//       </app-layout>
//     </div>
//   `,
//   data () {
//     return {title: 'this is header', msg: 'this is body', footer: 'this is foot'}
//   },
//   el: `#app`
// })

const A = {
  template: `
    <div class="a">
      <p>A Comp</p>
    </div>
  `,
  name: 'A',
  mounted () {
    console.log('A mounted')
  },
  created () {
    console.log('A created')
  },
  activated () {
    console.log('A activated')
  },
  deactivated () {
    console.log('A deactivated')
  }
}

const B = {
  template: `
    <div class="b">
      <p>B Comp</p>
    </div>
  `,
  name: 'B',
  mounted () {
    console.log('B mounted')
  },
  created () {
    console.log('B created')
  },
  activated () {
    console.log('B activated')
  },
  deactivated () {
    console.log('B deactivated')
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: `
    <div>
      <keep-alive>
        <component :is="currentComp"></component>
      </keep-alive>
      <button @click="change">switch</button>
    </div>
  `,
  data: {
    currentComp: 'A'
  },
  components: {
    A, B
  },
  methods: {
    change () {
      this.currentComp = this.currentComp === 'A' ? 'B' : 'A'
    }
  }
})

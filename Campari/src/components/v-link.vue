<template>
    <a :href="href"
       class="_a"
       :class="{active: isActive}"
       @click.prevent="go"
    >
        <slot></slot>
    </a>
</template>

<script>
    import routes from '../routes'

    export default {
        props:{
            href: {
                type:String,
                required: true
            }
        },
        computed: {
            isActive () {
                if (this.$root.currentRoute === '/products2') {
                    return this.href === '/products'
                }
                return this.href === this.$root.currentRoute
            }
        },
        methods: {
            go() {
                this.$root.currentRoute = this.href;
                window.history.pushState(
                    null,
                    routes[this.href],
                    this.href
                )
            }
        }
    }
</script>
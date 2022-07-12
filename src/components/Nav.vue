<template>
    <div class="nav">
        <router-link to="/money">
            <svg class="iconpark-icon">
                <use href="#consume"></use>
            </svg>
            记账
        </router-link>
        |
        <router-link to="/labels">
            <svg class="iconpark-icon">
                <use href="#bookmark-one"></use>
            </svg>
            标签
        </router-link>
        |
        <router-link to="/statistics">
            <svg class="iconpark-icon">
                <use href="#analysis"></use>
            </svg>
            统计
        </router-link>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Nav'
}
</script>

<style lang="scss" scoped>
.nav {
    border: 1px solid red;
}
</style>
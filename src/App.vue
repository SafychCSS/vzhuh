<template>
    <div class="app">
        <div id="nav">
            <router-link :to="{ name: 'Home', params: { id: 'home' } }">Home</router-link>
        </div>
        <router-view/>
    </div>
</template>
<script>

export default {
    name: 'Home',
};
</script>
<style lang="scss">
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 0;
}

body {
    font: 20px/1.4 'Montserrat Alternates', sans-serif;
}

.app {
    max-width: 1000px;
    margin: 0 auto;
}

.input {
    display: inline-block;
    width: 300px;
    padding: 10px;

    font-family: inherit;
    font-size: 16px;
    font-weight: 300;

    border: 1px solid #e5e5e5;
    border-radius: 5px;

    transition: .3s;

    &:focus {
        outline: 0;
        border-color: #9b9999;
    }
}

button {
    cursor: pointer;
}

ul {
    list-style: none;
}

</style>

<template>
    <div class="wrapper">
        <div class="about" v-if="!loading && ship">
            <h1>{{ ship.name }}</h1>
            <ul class="ship-info">
                <li
                    class="ship-info__item"
                    v-for="(prop, key) in ship"
                >
                    <template v-if="key === 'pilots'">
                        <p class="ship-info__name">{{ key }}:</p>
                        <div class="ship-info__value">
                            <ul
                                v-if="pilots.length"
                                class="pilots"
                            >
                                <li
                                    v-for="(pilot, idx) in pilots"
                                    class="pilots__item"
                                >
                                    <p v-if="pilot.name">Имя: {{ pilot.name }}</p>
                                    <p v-if="pilot.eye_color">Глаза: {{ pilot.eye_color }}</p>
                                    <p v-if="pilot.gender">Пол: {{ pilot.gender }}</p>
                                </li>
                            </ul>
                            <span v-else>сам летает</span>
                        </div>
                    </template>
                    <template v-else>
                        <p class="ship-info__name">{{ key }}:</p>
                        <p class="ship-info__value">{{ prop }}</p>
                    </template>
                </li>
            </ul>

        </div>
        <p v-else-if="!loading && !ship">не загрузить</p>
        <Loader v-else />
    </div>
</template>
<script>
import axios from 'axios';
import Loader from '../components/Loader';

export default {
    name: 'Ship',

    components: {
        Loader,
    },

    data() {
        return {
            ship: null,
            pilots: [],
            loading: true,
        };
    },

    computed: {

    },

    async mounted() {
        await this.getShip();
    },

    methods: {
        getShip() {
             return axios.get('https://swapi.dev/api/starships/' + this.$route.params.id + '/')
                .then((result) => {
                    this.ship = result.data;
                    return this.ship.pilots;
                })
                .then((res) => {
                    const pilotUrls = res.map((pilot) => axios.get(pilot));
                    const pilots = Promise.all(pilotUrls);

                    return new Promise(resolve => pilots.then((res) => {
                        res.forEach((item) => {
                            const { name, eye_color, gender } = item.data;
                            this.pilots.push({ name, eye_color, gender });
                        });
                        resolve();
                    }));
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    this.loading = false;
                })
        },
    }
};
</script>

<style lang="scss" scoped>
.ship-info {
    margin: 0;
    padding: 0;

    &__item {
        display: flex;
        flex-direction: column;
        padding: 10px;

        & + .ship-info__item {
            border-top: 1px solid #e5e5e5;
        }
    }

    &__name {
        margin: 0;

        font-size: 16px;
        color: gray;
    }

    &__value {
        margin: 0;
    }
}

.pilots {
    &__item {
        p {
            margin: 0;
            font-size: 18px;
        }

        & + .pilots__item {
            margin-top: 15px;
        }
    }
}
</style>

<template>
    <div class="ships">
        <div
            class="ships__wrapper"
            v-if="!loading && ships.length"
        >
            <div class="ships__search">
                <input
                    class="input"
                    type="text"
                    placeholder="search"
                    v-model="search"
                >
                <button @click="findShips">find</button>
            </div>

            <div class="ships__list">
                <div
                    class="ships__item"
                    v-for="ship in ships"
                    :key="ship.model"
                >
                    <div class="card">
                        <router-link class="card__title" :to="{ name: 'Ship', params: { id: ship.id } }">{{ ship.name }}</router-link>
                        <time :datetime="ship.created" class="card__date">{{ new Date(ship.created).toLocaleDateString() }}</time>
                    </div>
                </div>
                <router-view/>
            </div>

            <div class="ships__pages">
                <ul class="pages">
                    <li class="pages__item">
                        <a
                            @click.prevent="getPrevPage"
                            class="pages__link"
                            :class="{'-inactive': !prevPage}"
                            href="#"
                        >
                            prev
                        </a>
                    </li>
                    <li class="pages__item">
                        <a
                            @click.prevent="getNextPage"
                            class="pages__link"
                            :class="{'-inactive': !nextPage}"
                            href="#"
                        >
                            next
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <p v-else-if="!loading && !ships.length">не загрузить</p>
        <Loader v-else />
    </div>
</template>

<script>
import axios from 'axios';
import Loader from '../components/Loader';

export default {
    name: 'Home',

    components: {
        Loader,
    },

    data() {
        return {
            ships: [],
            countShip: 0,
            loading: true,
            nextPage: null,
            prevPage: null,
            search: '',
            foundedShips: [],
        }
    },

    async mounted() {
        if (this.$route.query.search) {
            await this.loadShips('https://swapi.dev/api/starships/?search=' + this.$route.query.search);
            this.search = this.$route.query.search;
        } else {
            if (this.ships.length === 0)
                await this.loadShips('https://swapi.dev/api/starships/');
        }
        this.loading = false;
    },
    watch: {
        async '$route.query'() {
            if (!this.$route.query.search) {
                await this.loadShips('https://swapi.dev/api/starships/');
                this.search = '';
            }
        }
    },

    methods: {
        loadShips(page) {
            this.loading = true;
            return axios.get(page)
                .then((result) => {
                    this.ships = result.data.results.map((item) => {
                        const shipId = +item.url.match(/(\d+)/)[1];
                        return {...item, id: shipId };
                    });
                    this.nextPage = result.data.next;
                    this.prevPage = result.data.previous;
                })
                .catch((e) => {
                    console.log(e);
                })
                .finally(() => {
                    this.loading = false;
                })
        },

        async getNextPage() {
            if (this.nextPage)
                await this.loadShips(this.nextPage);
        },

        async getPrevPage() {
            if (this.prevPage)
                await this.loadShips(this.prevPage);
        },

        findShips() {
            if (this.search) {
                this.$router.push('?search=' + this.search);
            }

            this.loadShips('https://swapi.dev/api/starships/?search=' + this.search);
        }
    }
};
</script>
<style lang="scss" scoped>
.ships {
    &__list {
        display: flex;
        flex-wrap: wrap;
        margin-left: -10px;
        margin-right: -10px;
    }

    &__item {
        width: calc(33.3333% - 20px);
        margin: 10px;
    }

    &__search {
        display: flex;
    }
}

.card {
    padding: 10px;

    border: 1px solid #e5e5e5;
    border-radius: 5px;

    &__title {
        display: block;

        font-size: 20px;
        text-decoration: none;
        color: teal;
    }

    &__date {
        font-size: 14px;
        color: gray;
    }
}

.pages {
    padding: 0;

    &__item {
        display: inline-block;

        & + .pages__item {
            margin-left: 10px;
        }
    }

    &__link {
        color: #974cdc;
        text-decoration: none;

        &:hover {
            color: darken(#974cdc, 10%);
        }

        &.-inactive {
            opacity: .6;
            cursor: default;

            &:hover {
                color: #974cdc;
            }
        }
    }
}
</style>
<script>
    import QuoteGeneratorComponent from '../components/quote-generator.component.vue';

    export default {
        name: 'advice-management',
        components: {
            QuoteGeneratorComponent
        },
        data() {
            return {
                quote: {
                    content: 'Content goes here',
                    author: 'Author'
                },
                quotes: []
            }
        },
        methods: {
            async getQuote() {
                const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
                headers: {
                    'X-Api-Key': 'QpW/WkeYV7SzZi07E1f/mw==Qld0XPkTeWMRuCTP'
                }
                });

                const data = await response.json();

                this.quote = {
                content: data[0].quote,
                author: data[0].author
                };
            }
        },
created() {
  this.getQuote();
},
        created () {
            this.getQuote();
        }


    }
</script>

<style>
.button-container{
    display: flex;
    justify-content: center;
    padding: 0px 32px;
    margin: 64px auto;
}

button {
    border: none;
    outline: none;
    background-color: rgb(66, 141, 66);
    padding: 16px 32px;
    border-radius: 99px;

    color: white;
    font-size: 28px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.4s;
}
</style>

<template>
    <div class="advice-page">
        <QuoteGeneratorComponent :quote="quote"/>
        <div class="button-container">
            <button @click="getQuote">Inspirational Quote</button>
        </div>
    </div>
</template>
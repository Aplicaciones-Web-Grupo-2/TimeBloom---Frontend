<script>
export default {
    props: ['quote']
}
</script>

<style scoped>
    .quote{
      position: relative;
      margin: 0 auto;
      padding: 32px;
      max-width: 720px;
    }
    .quote-content{
        position: relative;
        font-size: 28px;
        font-weight: 600;
        background-color: black;
        color: white;
        padding: 48px 32px;
        border-radius: 16px;
      
    }
    .quote-info{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 32px;
    }
    .quote-author{
        position: absolute;
        padding: 12px 16px;
        font-size: 24px;
        font-weight: 700;
        border-radius: 99px;
        color: white;
        text-align: center;
        top: calc(100% - 32px);
        right: 0;
        transform: translateY(-50%);
        background-color: rgb(42, 59, 42);
    }
</style>

<template>
    <section class="quote">
        <div class="quote-content">
                {{ quote.content }}
        </div>
        <div class="quote-info">
            <div class="quote-author">
                {{ quote.author }}
            </div>
        </div>

    </section>
</template>
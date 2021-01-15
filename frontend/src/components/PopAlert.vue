<template>
<div>
    <div id="popup"></div>
    <div id="popup-content">
        <div>
            <div id="popup-text"></div>
            <div id="popup-bottom"></div>
        </div>
    </div>
</div>  
</template>

<script>



export default {
    name: 'popAlert'
}
</script>

<style lang="scss">

@import "../sass/variables.scss";


#popup{
    display: none;
    opacity: .8;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: #0e2040;
    width: 100%;
    z-index: 10;
  }
  
  #popup-content{
    margin: auto;
    background-color: #FFF;
    display: none;
    position: fixed;
    top: 130px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top; 
    height: 230px;
    width: 270px;
    z-index: 10;
    @include tablette_ecran{
        width: 500px;
        height: 300px;
        top: 200px;
        }
    #popup-bottom{
      padding: 10px;
      text-align: center;
      #fermer{
        text-align: center;
        font-weight: 100;
        background: #0e2040;
        color: #FFF;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 1.2rem;
        font-weight: 500;
      }
    }
    #popup-text{
      font-size: 1.8rem;
      line-height: 1.3rem;
      color: rgb(85, 83, 83);
      padding:20px;
      #pluspetit{
        font-size: 1rem;

      }
      @include tablette_ecran{ 
      font-weight: 300;
      font-size: 3rem;
      line-height: 3rem;
      color: rgb(85, 83, 83);
      padding:20px;
      #pluspetit{
        font-size: 1.5rem;

      }
      }
    }
  }
</style>

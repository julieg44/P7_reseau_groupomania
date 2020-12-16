<template>
<div>
    <div id="popup"></div>
    <div id="popup-content">
        <div>
            <div id="popup-head"></div>
            <div id="popup-text"></div>
        </div>
    </div>
</div>  
</template>

<script>





export default {
    name: 'popAlert',
}
</script>

<style lang="scss">

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
    top: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top; 
    height: 230px;
    z-index: 10;

    #popup-head{
      padding: 10px;
      text-align: right;
      #fermer{
        text-align: center;
        font-weight: 100;
        background: #0e2040;
        color: #FFF;
        width: 20px;
        height: 20px;
        border: none;
      }
    }
    #popup-text{
      font-weight: 100;
      font-size: 3rem;
      color: rgb(85, 83, 83);
      padding:20px;
    }
  }
</style>
<template>
      <div class="progress-circle">
        <div class="inner"></div>
        <div class="outer"></div>
        <p class="progression-value"> {{ amount }} / {{ total }}</p>
        <div class="circle">
          <div class="bar left">
              <div class="progress"></div>
          </div>
          <div class="bar right">
              <div class="progress"></div>
          </div>
        </div>
        
          
      </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number
    },
    amount: {
      type: Number
    }
  }
}
</script>

<style scoped>
  .progress-circle {
    position: relative;
    height: 10rem;
    width: 10rem;
    /* background-color: #9E99EE;
   
   */
  }
  .progress-circle p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 15;
    font-size: 3em; 
    color: white;
    width: 100%;
  }

  .progress-circle .inner, .progress-circle .outer, .progress-circle .circle{
    position: absolute;
    z-index: 6;
    height: 100%;
    width: 100%;
    border-radius: 100%;
  }
  .progress-circle .inner {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 9rem;
    height: 9rem;
    background-color: #9E99EE;
  }
  .progress-circle .circle{
    z-index: 1;
  }
  
  .progress-circle .bar {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    clip: rect(0, 10rem, 10rem, 5rem);
    background-color: #9E99EE;
  }
  .progress-circle .bar .progress{
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 100%;
    clip: rect(0px, 5rem, 10rem, 0px);
  }
  .progress-circle .bar .progress, .dot span{
    background: #7AD1BA;
  }
  .progress-circle .left .progress{
    z-index: 1;
    animation: left .5s linear both;
  }

  .progress-circle .right{
    z-index: 3;
    transform: rotate(180deg);
  }
  .progress-circle .right .progress{
    animation: right .5s linear both;
    animation-delay: .5s;
  }
  
  @keyframes left {
    100%{
      transform: rotate(180deg);
    }
  }
  @keyframes right {
    100%{
      transform: rotate(60deg);
    }
  }

</style>

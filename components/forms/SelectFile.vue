<template>
  <div>
    <v-btn
      flat
      class=""
      color="#edb248"
      style="text-transform: none"
      @click="$refs.inputUpload.click()"
    >
      <img :src="orangeClip">
      Attach a file
    </v-btn>
    <input
      v-show="false"
      ref="inputUpload"
      type="file"
      @change="selectFile"
    >
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },

  computed: {

    orangeClip() {
      return this.getOrangeClip()
    }

  },

  methods: {
    selectFile(e) {

    },

    getOrangeClip() {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAZCAYAAAFyaf9ZAAAAAXNSR0IArs4c6QAAAjVJREFUOBG9U79rFFEQnnm3RvzRXA41hb2gKCKICCKIYHYX7kCwUgQVBEsVbRQkqEWwyl8QwRT2t5fbM7FWgxZBECsLfxRnsXsxkFNh743zvb1b7i7BwsIplnnf982beTOzRH3jpO4LES8bAIbl84AhSurBOuCufmRfjqf1IIOXRkHTCElJRW0R8qC+k2tAN4LHKrlUAJucNPKfuZwDxh3WIv8siWFKovA2mLw8ddZfnq84aRL5j/T6ezhoisXOYng6J9xLXNltAFrQ0qYsTtn/jKQfJZi7ACaMOaNXPKnU4nN63MsA9d4PxKLR/JpErm4rmQMszWB7p0fvSOjHZC0+BaGzwQPkxeVdAx+EvpGew+HphQ31E/gwQ0wZasdBiF27EfmXciHdwv4xAlvgBlFMHVUJ7SlXW9ct0fSEKR106bRNboEqtZZrDUA3ORHjoS/uxcxP9SUntVdWG3moKLQYaR/pN1Fe6T4dI+aPLPRJl/N4vn48p9G3imh1PO34WxEuKVHkh6DbDPb/zORrJwp65Wpc7KUnIoeZaQEiXZwrYu3UZLU1uzOMv2nPv1uhI+DWouCCZTo60kHbk4ua7SYE42ZJamLl/kjAuGir8/8OYB0kyVC31HeYFocfT80brpM9uSsZrRS7y/QL2LDGY+ZVBQKRGcM88179HcMC+OA6jRVf062a8u4TmOqXtPFmI43CG+NiYOCggbao1/1nGT3Qqq/plVMukLmtqzJf9ughh/FvYH8AFYX8N6LBQpUAAAAASUVORK5CYII='
    },

    getBlackClip() {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAXCAYAAAGqv4VQAAAAAXNSR0IArs4c6QAAAX1JREFUOBG9Ur1KA0EQvjshcEiU+zF3nBBII9goCCn0GSx9Ap/EPIJVinSxtbSwshCsUmmjjYJgMCDHITbxwJzfN+ysucRSHNid/X52Zm4Tx9EIgqDi2VPCCcPwZcX3/TVHNDVYE/QTMSdJssoDHM/chq1WKxGFm9psYRaygA6Xmy0vVUBIVVwexHG8ZxxTZgm1s7p2WCqsZuZax3mBna9rBAA5HWsd+NYYdouieHf4fWg6hmtobwLIeBwX4kAEHY0Ahp8XVkCBpl/H+yOyjwav6NNnM45xJQezEbNRB659ciZ3RAc4heOTmYSbpulGWZZ3VVUFrutekMT5EOei0WjsTCaTN3ISuPmEdaZYMzlqipllBlR5JEC7G6xjng0n85CjVnsZtD+Ar03zQrSp1cwLhiX4f+YCvbdMf2ZiGx6++gOoSSbLshTpAV9+yWwwpab4IPTwnl/I8hNSmQ/yRu/J3zqKou5sNjuHaRMVRsj3WNt4ri7y2PO8ozzPR98E9GRjzbroHAAAAABJRU5ErkJggg=='
    }
  }
}
</script>

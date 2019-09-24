<template>
	<div class="layout-row" 
			 :class="classes" 
			 :style="styles">
		<slot/>
	</div>
</template>

<script>
/**
 * Reason for having this component is that Vuetify 1.5.x does not support conditional
 * css classes for padding & margin. This was added only in 2.x
 */
export default {
	name: 'LayoutRow',
	props: {
		yPadAuto: {
			type: Boolean,
			default: false
		},
		yNoTop: {
			type: Boolean,
			default: false
		},
		classes: String
	},
	computed: {
		styles () {
			let xPad = this.$vuetify.breakpoint.name === 'xs'
				? 8
				: this.$vuetify.breakpoint.name === 'sm'
					? 16
					: this.$vuetify.breakpoint.width > 800
						? (this.$vuetify.breakpoint.width - 800) / 2
						: 48

			let yPad = this.yPadAuto
				? this.$vuetify.breakpoint.name === 'xs'
					? '16px'
					: '48px'
				: '0'

			let yTop = this.yNoTop
				? '0'
				: yPad

			return {
				'padding': `${yTop} ${xPad}px ${yPad} ${xPad}px`
			}
		}
	}
}
</script>

<style lang="scss">
.layout-row {
	& h1 {
		font-size: 30px;
		font-weight: 400;
		line-height: 1.3em;
	}

	& h2 {
		font-size: 100%;
		font-weight: normal;
	}
}
</style>
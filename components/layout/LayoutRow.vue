<template>
	<div :class="classes" :style="styles">
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
		yPad: {
			type: String,
			default: '0'
		},
		classes: String
	},
	computed: {
		styles () {
			let xPad = this.$vuetify.breakpoint.name === 'xs'
				? 8
				: this.$vuetify.breakpoint.name === 'sm'
					? 16
					: 48

			return {
				'padding': `${this.yPad} ${xPad}px ${this.yPad} ${xPad}px`
			}
		}
	}
}
</script>

<style lang="scss">

</style>
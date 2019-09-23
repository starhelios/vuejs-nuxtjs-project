<template>
	<footer>
		<LayoutRow classes="footer">
			<v-container>
				<v-layout row wrap justify-space-around align-center>
					<v-flex class="hidden-xs-only pt-1">
						<img src="/img/LogoWhite.svg">
					</v-flex>

					<v-flex xs12 sm4 class="text-xs-center">
						<a v-for="(link, i) in links"
							:key="`links${i}`"
							:href="link.href"
							target="_blank"
							:class="{ 'ml-2': i > 0 }">
							{{ link.text }}
						</a>
					</v-flex>

					<v-flex xs12 sm4 class="text-xs-center text-md-right copyright">
						{{ copyright }}
					</v-flex>
				</v-layout>
			</v-container>
		</LayoutRow>
	</footer>
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutRow from '@/components/layout/LayoutRow'

export default {
	components: {
		LayoutRow
	},
  computed: {
    ...mapGetters({
      heading: 'footer/getHeading',
      copyright: 'footer/getCopyright',
      links: 'footer/getLinks'
    })
  }
}
</script>

<style lang="scss">
.footer {
	background-color: rgb(133, 196, 205);
	color: white;
	font-size: 110%;

	@media screen and (max-width: 600px) {
		padding-top: 36px !important;
		padding-bottom: 36px !important;
	}

	@media screen and (min-width: 600px) {
		padding-top: 20px !important;
		padding-bottom: 20px !important;
	}

	& a {
		color: white;
		text-decoration: none;
		

		&:hover {
			color: rgb(251, 243, 212);
		}
	}

	& .copyright {
		font-weight: 100;
		font-family: serif !important;

		@media screen and (max-width: 600px) {
			margin-top: 16px;
		}		
	}
}
</style>
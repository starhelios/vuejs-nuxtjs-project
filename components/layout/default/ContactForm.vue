<template>
  <LayoutRow classes="contact-form" yPadAuto>
		<v-container>
			<v-layout wrap row>
				<v-flex	xs12 sm4 mb-3>
					<h1>{{ formHeading || contactFormHeading }}</h1>
				</v-flex>

				<v-flex xs12 sm8>
					<contact-form/>
				</v-flex>
			</v-layout>
		</v-container>
	</LayoutRow>
</template>

<script>
import ContactForm from '~/components/forms/Contact.vue'
import LayoutRow from '@/components/layout/LayoutRow'

export default {
  components: {
    ContactForm,
    LayoutRow
  },
  data() {
    return {
      isHydrated: false
    }
  },
  computed: {
    contactForm() {
      return this.isHydrated && this.$store.state.contentful.rawItems.contactForm &&
                    this.$store.state.contentful.rawItems.contactForm.length > 0
        ? this.$store.state.contentful.rawItems.contactForm[0].fields
        : false
    },
    contactFormHeading() {
      return this.isHydrated && this.contactForm
        ? this.contactForm.heading
        : ''
    },
    formHeading() {
      return this.isHydrated && this.$store.state.contentful.formHeading
        ? this.$store.state.contentful.formHeading
        : ''
    },
    contactFormRef: {
      get() {
        return this.isHydrated
          ? this.$store.state.header.setContactFormRef
          : false
      },
      set(value) {
        this.$store.commit('header/setContactFormRef', value)
      }
    }
  },
  mounted() {
    this.isHydrated = true
    this.contactFormRef = this.$refs.contactFormRef
  }
}
</script>

<style lang="scss">
/*
.contact-form {
  & input[type="checkbox"] {
    &:checked {
      background-color: red;
    }

    &:focus {

    }
  }
}
*/
</style>
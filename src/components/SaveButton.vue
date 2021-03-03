<template>
	<b-button class="mr-2" :variant="variant" @click="save"
		>Save changes <b-spinner v-if="isLoading" small></b-spinner
	></b-button>
</template>

<script>
	export default {
		name: 'SaveButton',

		props: {
			variant: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
			payload: {
				type: Object,
				required: true,
			},
			isValid: {
				type: Boolean,
				required: true,
			},
		},
		data() {
			return {
				isLoading: false,
			};
		},
		methods: {
			save() {
				this.isLoading = true;
				this.$emit('validate');

				this.$nextTick(async () => {
					if (this.isValid) {
						try {
							const res = await this.$http.post(this.url, this.payload);
							console.log({ res });
							console.log('payload: ', this.payload);
						} catch (error) {
							console.error(error);
						} finally {
							this.isLoading = false;
						}
					} else {
						this.isLoading = false;
					}
				});
			},
		},
	};
</script>

<style scoped lang="scss"></style>

<template>
	<b-button class="mr-2" variant="success" @click="save"
		>Save changes <b-spinner v-if="isLoading" small></b-spinner
	></b-button>
</template>

<script>
	export default {
		name: 'SaveButton',

		props: {
			url: {
				type: String,
				required: true,
			},
			payload: {
				type: Object,
				required: true,
			},
		},
		data() {
			return {
				isLoading: false,
			};
		},
		methods: {
			async save() {
				this.isLoading = true;

				try {
					const res = await this.$http.post(this.url, this.payload);
					console.log({ res });
					console.log('payload: ', this.payload);
				} catch (error) {
					console.error(error);
				} finally {
					this.isLoading = false;
				}
			},
		},
	};
</script>

<style></style>

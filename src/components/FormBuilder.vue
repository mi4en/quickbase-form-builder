<template>
	<section id="formBuilder" class="container">
		<b-card
			align="left"
			border-variant="info"
			header="Form Builder"
			header-bg-variant="info"
			header-text-variant="white"
			header-tag="header"
		>
			<b-form>
				<!-- Label -->
				<b-form-row id="group-label" label-for="label">
					<b-col lg="3" sm="12" class="mt-2">
						<label for="label">Label</label>
					</b-col>

					<b-col sm="12" lg="6">
						<b-form-input
							id="label"
							v-model="label"
							@input="backup($event, 'label')"
							@focus="labelState = null"
							type="text"
							placeholder="Sales Region"
							:state="labelState"
							required
						>
						</b-form-input>
						<b-form-invalid-feedback id="input-live-feedback">
							Required field
						</b-form-invalid-feedback>
					</b-col>
				</b-form-row>

				<!-- Type -->
				<b-form-row id="group-type" label-for="type" class="mt-4">
					<b-col lg="3" sm="12" class="mt-2">
						<label for="type">Type</label>
					</b-col>

					<b-col sm="12" lg="6" class="mt-2">
						<b-row>
							<b-col cols="4" class="multi-select">
								Multi-select
							</b-col>
							<b-col cols="8">
								<b-form-checkbox v-model="type"
									>A Value is required</b-form-checkbox
								>
							</b-col>
						</b-row>
					</b-col>
				</b-form-row>

				<!-- Default Value -->
				<b-form-row id="group-default-value" class="mt-4">
					<b-col lg="3" sm="12" class="mt-2">
						<label for="default-value">Default Value</label>
					</b-col>

					<b-col sm="12" lg="6">
						<b-form-input
							id="default-value"
							v-model="defaultValue"
							@input="backup($event, 'defaultValue')"
							@blur="syncChoices"
							type="text"
							placeholder="Enter Default Choice"
							required
						>
						</b-form-input>
					</b-col>
				</b-form-row>

				<!-- Add Choice -->
				<b-form-row id="group-add-choice" class="mt-4">
					<b-col lg="3" sm="12" class="mt-2">
						<label for="add-choice">Add Choice</label>
					</b-col>

					<b-col sm="12" lg="6">
						<b-input-group>
							<b-form-input
								id="add-choice"
								v-model="newChoice"
								type="text"
								placeholder="Enter New Choice"
								@focus="choicesDuplicateError = false"
								required
							>
							</b-form-input>
							<b-input-group-append>
								<b-button variant="info" @click="addChoice">Add</b-button>
							</b-input-group-append>
						</b-input-group>

						<!-- Duplicate Error -->
						<div v-if="choicesDuplicateError" cols="4" class="error mt-1">
							Duplicate entries are not allowed!
						</div>

						<!-- Length Error -->
						<div v-if="choicesLengthError" cols="4" class="error mt-1">
							Maximum of {{ maxChoices }} choices allowed!
						</div>
					</b-col>
				</b-form-row>

				<!-- Choices -->
				<b-form-row id="group-choices" class="mt-4" label-for="choices">
					<b-col lg="3" sm="12" class="mt-2">
						<label for="choices">Choices</label>
					</b-col>

					<b-col sm="12" lg="6">
						<div v-if="choices.length > 0" class="choices-container">
							<b-row
								class="choices-container-choice m-0"
								v-for="(choice, index) in choices"
								:key="index"
							>
								<b-col cols="11">
									{{ choice }}
								</b-col>
								<b-col class="pl-2" cols="1"
									><b-icon
										class="icon-delete"
										icon="trash"
										variant="danger"
										@click="removeChoice(choice)"
									></b-icon
								></b-col>
							</b-row>
						</div>

						<div v-else>
							No choices added
						</div>
					</b-col>
				</b-form-row>

				<!-- Order -->
				<b-form-row id="group-order" class="mt-4">
					<b-col lg="3" sm="12" class="mt-2">
						<label for="order">Order</label>
					</b-col>

					<b-col sm="12" lg="6">
						<b-form-select
							id="order"
							v-model="order"
							:options="orderOptions"
							@input="backup($event, 'defaultValue')"
							type="text"
						>
						</b-form-select>
					</b-col>
				</b-form-row>

				<!-- Form Controls -->
				<b-form-row>
					<b-col offset="3" class="mt-5">
						<SaveButton
							:variant="'success'"
							:url="'http://www.mocky.io/v2/566061f21200008e3aabd919'"
							:payload="payload"
							:isValid="isValid"
							@validate="validate"
						/>
						Or
						<span class="cancel ml-2" @click="resetForm">Cancel</span>
					</b-col>
				</b-form-row>
			</b-form>
		</b-card>
	</section>
</template>

<script>
	import SaveButton from '@/components/SaveButton.vue';

	export default {
		name: 'FormBuilder',
		components: {
			SaveButton,
		},

		data() {
			return {
				label: localStorage.getItem('label')
					? localStorage.getItem('label')
					: '',
				labelState: null,
				type: false,
				defaultValue: localStorage.getItem('defaultValue')
					? localStorage.getItem('defaultValue')
					: '',
				newChoice: '',
				choices: localStorage.getItem('choices')
					? JSON.parse(localStorage.getItem('choices'))
					: [],
				maxChoices: 2,
				choicesDuplicateError: false,
				choicesLengthError: false,
				order: 'Display choices alphabetical',
				orderOptions: ['Display choices alphabetical'],
				isValid: true,
			};
		},
		computed: {
			payload() {
				return {
					label: this.label,
					type: this.type,
					defaultValue: this.defaultValue,
					choices: this.choices,
					order: this.order,
				};
			},
		},
		methods: {
			backup(value, field) {
				localStorage.setItem(field, value);
			},
			syncChoices() {
				this.newChoice = this.defaultValue;
				this.addChoice();
			},
			addChoice() {
				this.choices.forEach(choice => {
					if (choice.toLowerCase() === this.newChoice.toLowerCase()) {
						this.choicesDuplicateError = true;
					}

					if (this.choices.length === this.maxChoices) {
						this.choicesLengthError = true;
					}
				});

				if (!this.choicesDuplicateError && !this.choicesLengthError) {
					this.choices.push(this.newChoice);
					this.backup(JSON.stringify(this.choices), 'choices');
					this.newChoice = '';
				}
			},
			removeChoice(choice) {
				if (choice === this.defaultValue) {
					this.defaultValue = '';
				}

				this.choices.pop(choice);
				this.backup(JSON.stringify(this.choices), 'choices');
			},
			resetForm() {
				localStorage.clear();
				this.label = '';
				this.defaultValue = '';
				this.choices = '';
				this.choicesDuplicateError = false;
				this.labelState = null;
			},
			validate() {
				if (this.label === '') {
					this.labelState = false;
					this.isValid = false;
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	#formBuilder {
		.choices-container {
			border: 1px solid lightgray;
			border-radius: 5px;

			&-choice {
				padding: 5px 0px;
				cursor: default;

				&:hover {
					background: lightgrey;
				}

				.icon-delete {
					cursor: pointer;
				}
			}
		}

		.multi-select {
			font-weight: bold;
		}

		.cancel {
			color: crimson;
			font-weight: bold;
			cursor: pointer;
		}
	}
</style>

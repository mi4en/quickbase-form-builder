import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue } from 'bootstrap-vue';
import FormBuilder from '@/components/FormBuilder.vue';

const localVue = createLocalVue();

localVue.use(BootstrapVue);

describe('FormBuilder.vue', () => {
	it('renders component', () => {
		const wrapper = shallowMount(FormBuilder, {
			localVue,
		});
		expect(wrapper.html()).toContain('Form Builder');
	});
});

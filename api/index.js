import pages from './modules/pages_index.js';
import pagesA from './modules/pagesA_index.js';
import pagesB from './modules/pagesB_index.js';
import pagesC from './modules/pagesC_index.js';
import store from '@/store/index.js';
store.commit('EXTCONFIG')
export default {
	pages,
	pagesA,
	pagesB,
	pagesC,
}

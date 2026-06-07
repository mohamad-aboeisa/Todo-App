import { initFiltersListeners, initListeners } from "./eventListeners";
import { initDataOnStartup, updateCounter } from "./utils";

initDataOnStartup();
initListeners();
updateCounter();
initFiltersListeners();

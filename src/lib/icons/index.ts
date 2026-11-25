// Icônes servies par l'appli elle-même (voir scripts/build-icons.mjs).
// Une icône absente du lot est encore chargée depuis l'API iconify en secours.
import { addCollection } from "iconify-icon";
import ion from "./ion.json";

addCollection(ion);

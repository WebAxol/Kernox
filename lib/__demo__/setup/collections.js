import { ArrayList } from '../../collection/ArrayList.js';
// Collections contain "any" entity type by default, allowing easy and flexible usage
/*
We can specify the entity type stored by each collection for stronger typing.
Below we have two ArrayLists containing the 'Kinetic' and 'Circle' types respectively.
*/
export class Kinetics extends ArrayList {
}
;
export class Renderables extends ArrayList {
}
;
/*
If a collections contains different entity types, TypeScript operators can be used to compose types,
for example, if we had multiple shapes to render:

class Renderables extends ArrayList<Square | Circle | Triangle>

It is up to you!
*/
// It is recommended to store collections within an array, to bundle them inside an addon.
export const collections = [Kinetics, Renderables];
//# sourceMappingURL=collections.js.map
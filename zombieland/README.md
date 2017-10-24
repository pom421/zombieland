# Zombieland

Jeu de type tower-defense en Node.js.

Un fichier entrant de jeu peut être :

data.txt

```
SS
ssssssss
TTTT
3
==========
======____
=======___
```

La 1ère ligne indique le nombre de snipers.
La 2ème ligne indique le nombre de soldat standards.
La 3ème ligne indique le nombre de tank (soutien).
//La 4ème ligne indique le nombre de zombie standard.
//La 5ème ligne indique le nombre de zombie améliorés.
La 6ème ligne indique le nombre de mur (ici 3 murs).
Les lignes suivantes dépendent de la 4ème lignes. Elles indiquent l'état de chacun des murs (chaque mur a une ligne). Si une ligne est égale à : 

====______

alors ces 4 signes égales veulent dire que le mur a une capacité de 4 sur 10 (les caractères _ restants indiquent le nombre max de PV).

À terme, on pourra peut être ajouter le nombre de zombie dans l'état initial:

```
SS
ssssssss
tttt
zzzzzzzz
ZZZ
3
==========
======____
=======___
```
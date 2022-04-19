-- INSERT INTO "main"."equipements"("name","debitMin","diamMin","coeff") VALUES 
-- ('Bidet',0.2,10,1),
-- ('Baignoire ≤ 150 L',0.33,13,3),
-- ('Baignoire 170 L',0.33,13,3.2),
-- ('Douche',0.2,12,2),
-- ('Poste eau robinet 1/2 ',0.33,12,2),
-- ('WC avec RESERVOIR de chasse', 0.12,10,0.5),
-- ('Urinoir',0.15,10,0.5),
-- ('Lave mains',0.1,10,0.5),
-- ('Bac a laver',	0.33,13,2),
-- ('MAL-linge',0.2,10,1),
-- ('MAL-vaisselle',0.1,10,1);

-- UPDATE equipements SET name = 'WC avec réservoir de chasse' WHERE name = 'WC avec reservoir de chasse';

ALTER TABLE equipements
ADD diamEvac INTEGER;
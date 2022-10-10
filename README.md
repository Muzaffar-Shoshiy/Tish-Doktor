SET @num := 0;
UPDATE table_name SET id = @num := (@num + 1);
ALTER TABLE table_name AUTO_INCREMENT = 1
// It is useful when you wanna set id number from 1 in your MySQL DB table.
// Muzaffar_Shoshiy

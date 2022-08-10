describe Tools;

SELECT * FROM Tools;

ALTER TABLE Tools ADD ToolsFluteDirection VARCHAR(10);

Alter table tools drop ToolsType;

INSERT INTO Tools(ToolsDiameter, ToolsFluteNo, ToolsShape, ToolsFluteDirection) VALUES(6, 1, 'ENDMILL', 'UP');
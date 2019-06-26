# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Store Data

Use Following Libaray for store data In database which file upload in api<br>
**1** [exceljs](https://www.npmjs.com/package/exceljs#reading-csv) for data view which in xlsx format or csv format<br>
**2** [adonis-spreadsheet](https://www.npmjs.com/package/adonis-spreadsheet) for data download in csv,xls,xlsx,ods

[blog of exceljs here](https://medium.com/@rayhanrafiudd/how-to-import-excel-file-into-database-with-adonisjs-b670f32d5c2a) <br>
[Doc of spreadsheet here](https://github.com/ntvsx193/adonis-spreadsheet#readme) and also view issues of this libaray compare npm doc and githun doc
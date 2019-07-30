# InWords

## Entity Framework Core tools reference - Package Manager Console in Visual Studio

https://docs.microsoft.com/ru-ru/ef/core/miscellaneous/cli/powershell\

## Reverse Engineering

Reverse engineering is the process of scaffolding entity type classes and a DbContext class based on a database schema. It can be performed using the Scaffold-DbContext command of the EF Core Package Manager Console (PMC) tools or the dotnet ef dbcontext scaffold command of the .NET Command-line Interface (CLI) tools.

https://docs.microsoft.com/ru-ru/ef/core/managing-schemas/scaffolding

Scaffold-DbContext "Server=server;Database=database;Uid=uid;Pwd=pwd;" Pomelo.EntityFrameworkCore.MySql -DataAnnotations -OutputDir Models

## Updating the model

After making changes to the database, you may need to update your EF Core model to reflect those changes. If the database changes are simple, it may be easiest just to manually make the changes to your EF Core model. For example, renaming a table or column, removing a column, or updating a column's type are trivial changes to make in code.

More significant changes, however, are not as easy make manually. One common workflow is to reverse engineer the model from the database again using -Force (PMC) or --force (CLI) to overwrite the existing model with an updated one.

Another commonly requested feature is the ability to update the model from the database while preserving customization like renames, type hierarchies, etc. Use issue #831 to track the progress of this feature.
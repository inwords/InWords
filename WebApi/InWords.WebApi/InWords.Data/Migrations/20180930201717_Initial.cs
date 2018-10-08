using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InWords.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    AccountID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(maxLength: 64, nullable: false),
                    Password = table.Column<string>(maxLength: 32, nullable: false),
                    Role = table.Column<int>(nullable: false),
                    RegistrationDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.AccountID);
                });

            migrationBuilder.CreateTable(
                name: "Languages",
                columns: table => new
                {
                    LanguageID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(maxLength: 32, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Languages", x => x.LanguageID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false),
                    NickName = table.Column<string>(maxLength: 32, nullable: true),
                    AvatarPath = table.Column<string>(nullable: true),
                    Expirience = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Users_Accounts_UserID",
                        column: x => x.UserID,
                        principalTable: "Accounts",
                        principalColumn: "AccountID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Words",
                columns: table => new
                {
                    WordID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Content = table.Column<string>(maxLength: 128, nullable: false),
                    LanguageID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Words", x => x.WordID);
                    table.ForeignKey(
                        name: "FK_Words_Languages_LanguageID",
                        column: x => x.LanguageID,
                        principalTable: "Languages",
                        principalColumn: "LanguageID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Series",
                columns: table => new
                {
                    SeriaID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SeriaName = table.Column<string>(maxLength: 64, nullable: false),
                    CreatorID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Series", x => x.SeriaID);
                    table.ForeignKey(
                        name: "FK_Series_Users_CreatorID",
                        column: x => x.CreatorID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WordPairs",
                columns: table => new
                {
                    WordPairID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WordForeignID = table.Column<int>(nullable: false),
                    WordNativeID = table.Column<int>(nullable: false),
                    Rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WordPairs", x => x.WordPairID);
                    table.ForeignKey(
                        name: "FK_WordPairs_Words_WordForeignID",
                        column: x => x.WordForeignID,
                        principalTable: "Words",
                        principalColumn: "WordID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WordPairs_Words_WordNativeID",
                        column: x => x.WordNativeID,
                        principalTable: "Words",
                        principalColumn: "WordID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersSerias",
                columns: table => new
                {
                    UserSeriaID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SeriaID = table.Column<int>(nullable: true),
                    UserID = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersSerias", x => x.UserSeriaID);
                    table.ForeignKey(
                        name: "FK_UsersSerias_Series_SeriaID",
                        column: x => x.SeriaID,
                        principalTable: "Series",
                        principalColumn: "SeriaID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UsersSerias_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserWordPairs",
                columns: table => new
                {
                    UserWordPairID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WordPairID = table.Column<int>(nullable: false),
                    IsInvertPair = table.Column<bool>(nullable: false),
                    UserID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWordPairs", x => x.UserWordPairID);
                    table.ForeignKey(
                        name: "FK_UserWordPairs_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserWordPairs_WordPairs_WordPairID",
                        column: x => x.WordPairID,
                        principalTable: "WordPairs",
                        principalColumn: "WordPairID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SeriaWords",
                columns: table => new
                {
                    SeriaWordID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SeriaID = table.Column<int>(nullable: false),
                    UserWordPairID = table.Column<int>(nullable: false),
                    Level = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SeriaWords", x => x.SeriaWordID);
                    table.ForeignKey(
                        name: "FK_SeriaWords_Series_SeriaID",
                        column: x => x.SeriaID,
                        principalTable: "Series",
                        principalColumn: "SeriaID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SeriaWords_UserWordPairs_UserWordPairID",
                        column: x => x.UserWordPairID,
                        principalTable: "UserWordPairs",
                        principalColumn: "UserWordPairID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SeriaWords_SeriaID",
                table: "SeriaWords",
                column: "SeriaID");

            migrationBuilder.CreateIndex(
                name: "IX_SeriaWords_UserWordPairID",
                table: "SeriaWords",
                column: "UserWordPairID");

            migrationBuilder.CreateIndex(
                name: "IX_Series_CreatorID",
                table: "Series",
                column: "CreatorID");

            migrationBuilder.CreateIndex(
                name: "IX_UsersSerias_SeriaID",
                table: "UsersSerias",
                column: "SeriaID");

            migrationBuilder.CreateIndex(
                name: "IX_UsersSerias_UserID",
                table: "UsersSerias",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserWordPairs_UserID",
                table: "UserWordPairs",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_UserWordPairs_WordPairID",
                table: "UserWordPairs",
                column: "WordPairID");

            migrationBuilder.CreateIndex(
                name: "IX_WordPairs_WordForeignID",
                table: "WordPairs",
                column: "WordForeignID");

            migrationBuilder.CreateIndex(
                name: "IX_WordPairs_WordNativeID",
                table: "WordPairs",
                column: "WordNativeID");

            migrationBuilder.CreateIndex(
                name: "IX_Words_LanguageID",
                table: "Words",
                column: "LanguageID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SeriaWords");

            migrationBuilder.DropTable(
                name: "UsersSerias");

            migrationBuilder.DropTable(
                name: "UserWordPairs");

            migrationBuilder.DropTable(
                name: "Series");

            migrationBuilder.DropTable(
                name: "WordPairs");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Words");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Languages");
        }
    }
}

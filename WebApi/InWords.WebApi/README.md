WebAPI — связь приложений с сайтом
==================================

### Текущая версия: 1.0

Сервис, позволяющий внешним одобренным сервисам и приложениям взаимодействовать с сайтом, 
работающим на платформе [ASP.Net Core 2.1](https://docs.microsoft.com/ru-ru/aspnet/core/release-notes/aspnetcore-2.1?view=aspnetcore-2.1).

Одним из таких приложений является [Официальный клиент на Android](https://github.com/rugged-bl/InWords).

По всем вопросам: https://github.com/rugged-bl/InWords/issues


1. Регламент методов API
------------------------
-   Запрос осуществляется по адресу:
 
        http://chatqq.ru/apu/<подсервис>

-   Данные, передаваемые с запросом на сервер, отправляются либо как POST, либо как PUT, UPDATE или DELETE в JSON формате.
-   Контент, отправляемый сервису API должен быть в формате JSON, иметь заголовок:

        Content-Type: application/json; charset=UTF-8

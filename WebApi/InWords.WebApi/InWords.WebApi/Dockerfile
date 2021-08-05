#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 5100
EXPOSE 5101

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["InWords.Data.DTO/InWords.Data.DTO.csproj", "InWords.Data.DTO/"]
COPY ["InWords.Service.Encryption/InWords.Service.Encryption.csproj", "InWords.Service.Encryption/"]
COPY ["InWords.Service.Auth/InWords.Service.Auth.csproj", "InWords.Service.Auth/"]
COPY ["InWords.Protobuf/InWords.Protobuf.csproj", "InWords.Protobuf/"]
COPY ["InWords.Business/InWords.Business.fsproj", "InWords.Business/"]
COPY ["InWords.WebApi/InWords.WebApi.csproj", "InWords.WebApi/"]
COPY ["InWords.Common/InWords.Common.csproj", "InWords.Common/"]
COPY ["InWords.Data/InWords.Data.csproj", "InWords.Data/"]
RUN dotnet restore "InWords.WebApi/InWords.WebApi.csproj"
COPY . .
WORKDIR "/src/InWords.WebApi"
RUN dotnet build "InWords.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "InWords.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
VOLUME /app/AppData

ENTRYPOINT ["dotnet", "InWords.WebApi.dll"]
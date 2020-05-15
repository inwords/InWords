namespace InWords.Business.GameEvaluator

open InWords.Data.Enums

module Say =
    
    type GameResult = {
        LevelId : int
        Score : int
        GameType : GameType
    }

    type CardGame = {
        LevelId : int
        Stats : Map<int,int>
    }
    
    type AudioGame = {
        LevelId : int
        Stats : Map<int,int>
    }

    type Game = 
    | CardGame of CardGame
    | AudioGame of AudioGame

    let Estimate game = 
        match game with
        | CardGame(game) -> printf "Cargame"
        | AudioGame(game)->  printf "audiogame"

    let hello name =
        printfn "Hello %s" name

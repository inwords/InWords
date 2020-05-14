
namespace InWords.Business.Utils

open System
module EmailHider =

    let hideEmail (email: string) =
        let parts = email.Split('@')
        let ma = parts.[0]+parts.[1]
        ma

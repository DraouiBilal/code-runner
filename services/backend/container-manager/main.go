package main

import (
    "code-runner/backend/lib/routing"
)


func main()  {
    server := routing.InitServer()   
    server.ListenAndServe()
}

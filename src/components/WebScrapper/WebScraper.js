import { useEffect, useState } from "react"
import { getArticles } from "../APIManager"


export const WebScraper = () => {
    const [articles, setArticles] = useState()

    const axios = require("axios")
    const cheerio = require("cheerio")

    useEffect(
        () => {
            getArticles()
            .then(
                (response) => {
                    setArticles(response)
                }
            )
        },[]
    )
    

    
    return <p>{articles}</p>
}
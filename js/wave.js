function createElement(tag, attributes = {}, children = []) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag)
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
    children.forEach((child) => element.appendChild(child))
    return element
}

function createAnimatedGrid(selector, prop) {
    const unique = Date.now()
    const svg = document.querySelector(selector)

    const startTokens = prop.startPath.split(" ")
    const endingTokens = prop.endingPath.split(" ")

    svg.appendChild(createElement("path", {...prop.basePathProp, d: prop.startPath}))
    svg.appendChild(createElement("path", {...prop.basePathProp, d: prop.endingPath}))
    for (let i = 0; i < prop.count; i++) {
        const dPath = []
        for (let j = 0; j < endingTokens.length; j++) {
            if (startTokens[j] === endingTokens[j]) {
                dPath.push(startTokens[j])
            } else {
                const startToken = parseFloat(startTokens[j])
                const endToken = parseFloat(endingTokens[j])
                dPath.push(startToken + (endToken - startToken) * i / prop.count)
            }
        }
        svg.appendChild(
            createElement("path", prop.basePathProp, [
                createElement("animate", {
                    "dur": `${(prop.count - i) / prop.count * prop.duration}`,
                    "id": `ani${unique}${i}`,
                    "attributeName": "d",
                    "from": dPath.join(" "),
                    "to": prop.endingPath,
                }),
                createElement("animate", {
                    "dur": `${prop.duration}`,
                    "begin": `ani${unique}${i}.end`,
                    "attributeName": "d",
                    "repeatCount": "indefinite",
                    "from": prop.startPath,
                    "to": prop.endingPath,
                })
            ])
        )
    }
}

createAnimatedGrid("#wav0", {
    endingPath: "M 1733.43 692.339 C 1737.52 698.355 1574.47 1135.14 1581.96 1136.56 C 1589.44 1137.98 1199.05 2016.52 1197.63 2023.99",
    startPath: "M 974.362 120.147 C 1154.52 384.808 1540.29 520.961 1869.43 583.486 C 2198.58 646.011 113.926 1206.67 51.4006 1535.81",
    count: 50,
    duration: 25,
    basePathProp: {fill: "none", stroke: "#00A4B8"}
})

createAnimatedGrid("#wav1", {
    startPath: "M 35.3297 70.717 C 54.2895 70.717 69.6594 54.9923 69.6594 35.5948 C 69.6594 16.1974 54.2895 0.472656 35.3297 0.472656 C 16.3699 0.472656 1 16.1974 1 35.5948 C 1 54.9923 16.3699 70.717 35.3297 70.717  Z",
    endingPath: "M 190.742 387.121 C 294.544 387.121 378.693 301.03 378.693 194.831 C 378.693 88.632 294.544 2.54077 190.742 2.54077 C 86.939 2.54077 2.79034 88.632 2.79034 194.831 C 2.79034 301.03 86.939 387.121 190.742 387.121  Z",
    count: 25,
    duration: 25,
    basePathProp: {fill: "none", stroke: "#FAFAFA"}
})

createAnimatedGrid("#wav1", {
    startPath: "M 356.225 387.198 C 368.717 387.198 378.844 376.838 378.844 364.058 C 378.844 351.277 368.717 340.917 356.225 340.917 C 343.733 340.917 333.606 351.277 333.606 364.058 C 333.606 376.838 343.733 387.198 356.225 387.198 Z",
    endingPath: "M 253.827 385.841 C 322.225 385.841 377.673 329.113 377.673 259.136 C 377.673 189.159 322.225 132.431 253.827 132.431 C 185.429 132.431 129.981 189.159 129.981 259.136 C 129.981 329.113 185.429 385.841 253.827 385.841 Z",
    count: 25,
    duration: 25,
    basePathProp: {fill: "none", stroke: "#FAFAFA"}
})

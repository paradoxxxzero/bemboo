const rewire = require("rewire")
const index = rewire("./index")
const coalesce = index.__get__("coalesce")
// @ponicode
describe("index.resetCache", () => {
    test("0", () => {
        let callFunction = () => {
            index.resetCache()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.disableCache", () => {
    test("0", () => {
        let callFunction = () => {
            index.disableCache()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("coalesce", () => {
    test("0", () => {
        let param1 = [[100, -100, 100], [-5.48, -5.48, 0], [100, 1, -5.48]]
        let callFunction = () => {
            coalesce(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1 = [[0, 1, -5.48], [1, 1, 0], [-100, -100, 1]]
        let callFunction = () => {
            coalesce(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [[100, -100, 0], [0, -100, 100], [-5.48, -100, 0]]
        let callFunction = () => {
            coalesce(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1 = [[0, -5.48, 100], [-5.48, 100, 1], [100, 100, -100]]
        let callFunction = () => {
            coalesce(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [[0, 1, -5.48], [100, 100, -100], [-100, -5.48, 0]]
        let callFunction = () => {
            coalesce(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            coalesce(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("e", () => {
    let inst

    beforeEach(() => {
        inst = new index.Block()
    })

    test("0", () => {
        let callFunction = () => {
            inst.e(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.e(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.e(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("m", () => {
    let inst

    beforeEach(() => {
        inst = new index.Block()
    })

    test("0", () => {
        let callFunction = () => {
            inst.m(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.m(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.m(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("sub", () => {
    let inst

    beforeEach(() => {
        inst = new index.Block()
    })

    test("0", () => {
        let param1 = [["Michael", "Anas", "Jean-Philippe"], ["Jean-Philippe", "Anas", "Anas"], ["George", "Edmond", "Jean-Philippe"]]
        let callFunction = () => {
            inst.sub(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1 = [["Michael", "Jean-Philippe", "Pierre Edouard"], ["Jean-Philippe", "Edmond", "Edmond"], ["George", "Michael", "Jean-Philippe"]]
        let callFunction = () => {
            inst.sub(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [["Edmond", "Michael", "Anas"], ["Jean-Philippe", "Edmond", "Jean-Philippe"], ["Anas", "Jean-Philippe", "Pierre Edouard"]]
        let callFunction = () => {
            inst.sub(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1 = [["Anas", "Jean-Philippe", "Anas"], ["Michael", "Jean-Philippe", "Anas"], ["Jean-Philippe", "Edmond", "Edmond"]]
        let callFunction = () => {
            inst.sub(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [["Edmond", "Pierre Edouard", "Michael"], ["Pierre Edouard", "Pierre Edouard", "Anas"], ["Edmond", "Anas", "Edmond"]]
        let callFunction = () => {
            inst.sub(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.sub(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("mix", () => {
    let inst

    beforeEach(() => {
        inst = new index.Block()
    })

    test("0", () => {
        let callFunction = () => {
            inst.mix("Jean-Philippe")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.mix("Pierre Edouard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.mix("George")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.mix("Michael")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.mix("Edmond")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.mix(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("copy", () => {
    let inst

    beforeEach(() => {
        inst = new index.Block()
    })

    test("0", () => {
        let callFunction = () => {
            inst.copy({ block: true, element: false, modifier: false, mixed: true, subs: true, settings: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.copy({ block: true, element: true, modifier: false, mixed: true, subs: true, settings: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.copy({ block: false, element: false, modifier: false, mixed: false, subs: false, settings: true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.copy({ block: false, element: true, modifier: false, mixed: true, subs: false, settings: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.copy({ block: false, element: true, modifier: true, mixed: true, subs: true, settings: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.copy({ block: undefined, element: undefined, modifier: undefined, mixed: undefined, subs: undefined, settings: true })
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("generate", () => {
    let inst

    beforeEach(() => {
        inst = new index.Block()
    })

    test("0", () => {
        let callFunction = () => {
            inst.generate()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("toString", () => {
    let inst

    beforeEach(() => {
        inst = new index.Block()
    })

    test("0", () => {
        let callFunction = () => {
            inst.toString()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.wrapFunction", () => {
    test("0", () => {
        let param3 = [[100, -5.48, -100], [-100, 1, 0], [-100, -5.48, -5.48]]
        let callFunction = () => {
            index.wrapFunction({ apply: () => "Anas" }, "Edmond", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param3 = [[-5.48, 0, 100], [0, 100, -100], [100, 0, 100]]
        let callFunction = () => {
            index.wrapFunction({ apply: () => "Michael" }, "Jean-Philippe", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param3 = [[-5.48, 1, 0], [-5.48, -5.48, -100], [-5.48, 1, -100]]
        let callFunction = () => {
            index.wrapFunction({ apply: () => "Michael" }, "Jean-Philippe", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param3 = [[-100, 0, -5.48], [-100, 0, 1], [0, 1, -100]]
        let callFunction = () => {
            index.wrapFunction({ apply: () => "Michael" }, "George", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param3 = [[-5.48, 1, -100], [-100, -5.48, 100], [-5.48, -5.48, 0]]
        let callFunction = () => {
            index.wrapFunction({ apply: () => "Anas" }, "George", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.wrapFunction(undefined, "", undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.wrapClass", () => {
    test("0", () => {
        let param3 = [[-100, 100, 0], [-100, -100, 0], [1, 1, 1]]
        let callFunction = () => {
            index.wrapClass({ prototype: { b: 0, render: false } }, "Anas", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param3 = [[0, -5.48, 0], [100, 1, 1], [-5.48, 0, -5.48]]
        let callFunction = () => {
            index.wrapClass({ prototype: { b: 100, render: false } }, "Jean-Philippe", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param3 = [[0, 0, 1], [-5.48, -100, 100], [-5.48, -5.48, 100]]
        let callFunction = () => {
            index.wrapClass({ prototype: { b: 100, render: true } }, "Michael", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param3 = [[0, 0, 1], [100, 0, 100], [0, 0, -100]]
        let callFunction = () => {
            index.wrapClass({ prototype: { b: 0, render: true } }, "Michael", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param3 = [[100, -100, 1], [1, -5.48, -5.48], [-100, -5.48, -5.48]]
        let callFunction = () => {
            index.wrapClass({ prototype: { b: -5.48, render: false } }, "Michael", param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.wrapClass({ prototype: { b: Infinity, render: false } }, "", [])
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.default", () => {
    test("0", () => {
        let object = [[-100, -100, 1], [-5.48, 100, 1], [-5.48, -100, 100]]
        let object2 = [[100, 1, 100], [100, -100, 1], [-100, 100, -100]]
        let object3 = [[0, -100, 0], [0, -100, 1], [100, 0, -100]]
        let param1 = [object, object2, object3]
        let callFunction = () => {
            index.default(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object = [[100, -5.48, -100], [0, -5.48, 0], [0, -100, -5.48]]
        let object2 = [[100, 0, 1], [-5.48, -5.48, -100], [100, 1, -100]]
        let object3 = [[100, -100, -5.48], [100, -100, -100], [0, 0, 100]]
        let param1 = [object, object2, object3]
        let callFunction = () => {
            index.default(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object = [[0, -5.48, 100], [0, -100, -5.48], [1, 0, 0]]
        let object2 = [[1, -100, 1], [-100, 100, 100], [0, 1, 100]]
        let object3 = [[-100, 100, -5.48], [1, 100, -100], [0, -5.48, -100]]
        let param1 = [object, object2, object3]
        let callFunction = () => {
            index.default(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object = [[100, 100, -100], [-100, 0, 100], [1, 1, 100]]
        let object2 = [[-100, -100, -5.48], [-100, 1, 1], [100, -5.48, 100]]
        let object3 = [[1, -5.48, -100], [-100, 0, 0], [100, 0, -5.48]]
        let param1 = [object, object2, object3]
        let callFunction = () => {
            index.default(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object = [[-5.48, 0, 0], [-100, -5.48, 1], [100, 0, -5.48]]
        let object2 = [[100, -100, 0], [0, -5.48, 100], [-5.48, -100, 1]]
        let object3 = [[-100, -100, 0], [1, -5.48, 100], [0, 1, 1]]
        let param1 = [object, object2, object3]
        let callFunction = () => {
            index.default(param1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            index.default(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("index.blockMaker", () => {
    test("0", () => {
        let callFunction = () => {
            index.blockMaker(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            index.blockMaker(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            index.blockMaker(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

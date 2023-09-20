import { useDispatch, useSelector } from 'react-redux'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToyOptimistic, saveToy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART, SET_FILTER_BY } from '../store/reducers/toy.reducer.js'
import { useEffect } from 'react'

export function ToyIndex() {

    const dispatch = useDispatch()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load cars')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        const toyToSave = { ...toy, price }
        saveToy(toyToSave)
            .then(savedToy => {
                showSuccessMsg(`Car updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                console.log('Cannot update car', err)
                showErrorMsg('Cannot update car')
            })
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <button onClick={onAddToy}>Add Toy 👸🏾</button>
                {/* <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}

                {/* {!isLoading && <CarList
                    cars={cars}
                    onRemoveCar={onRemoveCar}
                    onEditCar={onEditCar}
                    addToCart={addToCart}
                    txt={'54'}
                nums={[1, 2, 3]}
                />
                } */}

                {/* {isLoading && <div>Loading...</div>}
                <hr /> */}
                {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
            </main>
        </div>
    )

}
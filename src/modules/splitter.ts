import Split from 'split-grid'
import { getElement as $ } from './utilities'

Split({
    columnGutters: [
        {
        track: 1,
        element: $('.vertical-gutter')
        }
    ],
    rowGutters: [
        {
        track: 1,
        element: $('.horizontal-gutter')
        }
    ]
})
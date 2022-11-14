import '../styles/Tiles.css';

const colors = {
    0: 'whiteTile',
    1: 'blackTile',
    2: 'moveTile',
    3: 'selectedTile'
};

export default function Tile(props) {
    const {row, col, color, piece, handleClick} = props

    return (
        <>
            <div
                onClick={() => {handleClick(row, col)}}
                className={'tileContainer ' + colors[color]}>
                <div className='tileContent'>
                    <img className='pieceImage' src={piece}></img>
                </div>
            </div>
        </>
    )
}
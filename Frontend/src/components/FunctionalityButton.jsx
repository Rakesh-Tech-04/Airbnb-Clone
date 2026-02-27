export const FunctionalityButton = ({ loadingTitle, title, onClick, type, isSubmitting = false }) => {
    return (
        <div>
            <button disabled={isSubmitting} onClick={onClick} type={type} style={{
                fontSize: '1.2rem',
                color: "white",
                background: 'red',
                border: 'none',
                padding: '0.7rem 5rem',
                marginBlock: '0.7rem',
                borderRadius: '8px',
                cursor: 'pointer'
            }}>
                {isSubmitting ? loadingTitle : title}
            </button>
        </div >
    )
}

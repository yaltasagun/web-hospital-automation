/**
 * Generic modal overlay component.
 *
 * Props:
 *   open     {boolean}    - Whether the modal is visible
 *   onClose  {function}   - Called when user clicks overlay or × button
 *   title    {string}     - Modal header title
 *   children {ReactNode}  - Modal body content
 *   footer   {ReactNode}  - Footer buttons (optional)
 */
export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <div className="modal-hdr">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-ftr">{footer}</div>}
      </div>
    </div>
  );
}

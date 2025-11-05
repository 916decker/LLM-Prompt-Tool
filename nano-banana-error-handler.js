/**
 * Error Handling & Utility Infrastructure
 * Bulletproof error handling for Nano Banana Prompt Builder
 */

// ============================================================================
// GLOBAL ERROR HANDLER
// ============================================================================

window.addEventListener('error', function(event) {
  console.error('Global Error:', event.error);
  showErrorToast('An unexpected error occurred. Please refresh the page.');
  return true; // Prevent default error handling
});

window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled Promise Rejection:', event.reason);
  showErrorToast('An operation failed. Please try again.');
  event.preventDefault();
});

// ============================================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================================

function showToast(message, type = 'success') {
  try {
    const toastId = type === 'error' ? 'errorToast' : 'successToast';
    const messageId = type === 'error' ? 'errorToastMessage' : 'successToastMessage';
    
    const toast = document.getElementById(toastId);
    const messageEl = document.getElementById(messageId);
    
    if (!toast || !messageEl) {
      console.warn('Toast elements not found');
      alert(message); // Fallback to alert
      return;
    }
    
    messageEl.textContent = message;
    toast.style.display = 'flex';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      toast.style.display = 'none';
    }, 5000);
    
    // Close button
    const closeBtn = toast.querySelector('.nb-toast-close');
    if (closeBtn) {
      closeBtn.onclick = () => {
        toast.style.display = 'none';
      };
    }
  } catch (error) {
    console.error('Error showing toast:', error);
    alert(message); // Ultimate fallback
  }
}

function showErrorToast(message) {
  showToast(message, 'error');
}

function showSuccessToast(message) {
  showToast(message, 'success');
}

// ============================================================================
// SAFE DOM ACCESS UTILITIES
// ============================================================================

function safeGetElement(id) {
  try {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element not found: ${id}`);
      return null;
    }
    return element;
  } catch (error) {
    console.error(`Error getting element ${id}:`, error);
    return null;
  }
}

function safeGetElements(selector) {
  try {
    const elements = document.querySelectorAll(selector);
    return Array.from(elements);
  } catch (error) {
    console.error(`Error querying selector ${selector}:`, error);
    return [];
  }
}

function safeSetTextContent(elementId, text) {
  try {
    const element = safeGetElement(elementId);
    if (element) {
      element.textContent = String(text || '');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error setting text content for ${elementId}:`, error);
    return false;
  }
}

function safeSetHTML(elementId, html) {
  try {
    const element = safeGetElement(elementId);
    if (element) {
      element.innerHTML = String(html || '');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error setting HTML for ${elementId}:`, error);
    return false;
  }
}

function safeSetValue(elementId, value) {
  try {
    const element = safeGetElement(elementId);
    if (element) {
      element.value = String(value || '');
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error setting value for ${elementId}:`, error);
    return false;
  }
}

function safeGetValue(elementId, defaultValue = '') {
  try {
    const element = safeGetElement(elementId);
    return element ? (element.value || defaultValue) : defaultValue;
  } catch (error) {
    console.error(`Error getting value for ${elementId}:`, error);
    return defaultValue;
  }
}

function safeAddEventListener(elementId, event, handler) {
  try {
    const element = safeGetElement(elementId);
    if (element && typeof handler === 'function') {
      element.addEventListener(event, function(e) {
        try {
          handler(e);
        } catch (error) {
          console.error(`Error in ${event} handler for ${elementId}:`, error);
          showErrorToast('An error occurred. Please try again.');
        }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error adding event listener to ${elementId}:`, error);
    return false;
  }
}

// ============================================================================
// SAFE STORAGE ACCESS
// ============================================================================

function safeLocalStorageGet(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
    showErrorToast('Failed to save data. Storage may be full.');
    return false;
  }
}

function safeLocalStorageRemove(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
}

// ============================================================================
// INPUT VALIDATION UTILITIES
// ============================================================================

function validateRequired(value, fieldName = 'This field') {
  if (!value || String(value).trim().length === 0) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}

function validateLength(value, min = 0, max = Infinity, fieldName = 'Input') {
  const length = String(value || '').length;
  if (length < min) {
    return { valid: false, error: `${fieldName} must be at least ${min} characters` };
  }
  if (length > max) {
    return { valid: false, error: `${fieldName} must be no more than ${max} characters` };
  }
  return { valid: true };
}

function validateNumber(value, min = -Infinity, max = Infinity, fieldName = 'Number') {
  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, error: `${fieldName} must be a valid number` };
  }
  if (num < min) {
    return { valid: false, error: `${fieldName} must be at least ${min}` };
  }
  if (num > max) {
    return { valid: false, error: `${fieldName} must be no more than ${max}` };
  }
  return { valid: true };
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function validateVariableName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Variable name is required' };
  }
  
  const trimmed = name.trim();
  
  if (trimmed.length === 0) {
    return { valid: false, error: 'Variable name cannot be empty' };
  }
  
  if (trimmed.length > 50) {
    return { valid: false, error: 'Variable name must be 50 characters or less' };
  }
  
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmed)) {
    return { valid: false, error: 'Variable name must start with a letter or underscore and contain only letters, numbers, and underscores' };
  }
  
  return { valid: true, value: trimmed };
}

// ============================================================================
// SAFE ARRAY/OBJECT ACCESS
// ============================================================================

function safeArrayAccess(array, index, defaultValue = null) {
  try {
    if (!Array.isArray(array)) return defaultValue;
    if (index < 0 || index >= array.length) return defaultValue;
    return array[index];
  } catch (error) {
    console.error('Error accessing array:', error);
    return defaultValue;
  }
}

function safeObjectAccess(obj, path, defaultValue = null) {
  try {
    if (!obj || typeof obj !== 'object') return defaultValue;
    
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current[key] === undefined || current[key] === null) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current;
  } catch (error) {
    console.error('Error accessing object path:', error);
    return defaultValue;
  }
}

function safeFilter(array, predicate) {
  try {
    if (!Array.isArray(array)) return [];
    if (typeof predicate !== 'function') return array;
    return array.filter((item, index) => {
      try {
        return predicate(item, index);
      } catch (error) {
        console.error('Error in filter predicate:', error);
        return false;
      }
    });
  } catch (error) {
    console.error('Error in safe filter:', error);
    return [];
  }
}

function safeMap(array, mapper) {
  try {
    if (!Array.isArray(array)) return [];
    if (typeof mapper !== 'function') return array;
    return array.map((item, index) => {
      try {
        return mapper(item, index);
      } catch (error) {
        console.error('Error in map function:', error);
        return item;
      }
    });
  } catch (error) {
    console.error('Error in safe map:', error);
    return [];
  }
}

// ============================================================================
// DEBOUNCE UTILITY
// ============================================================================

function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      try {
        func(...args);
      } catch (error) {
        console.error('Error in debounced function:', error);
        showErrorToast('An error occurred processing your request.');
      }
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================================================
// ASYNC ERROR WRAPPER
// ============================================================================

async function safeAsync(asyncFunc, errorMessage = 'Operation failed') {
  try {
    return await asyncFunc();
  } catch (error) {
    console.error('Async error:', error);
    showErrorToast(errorMessage);
    return null;
  }
}

// ============================================================================
// CLIPBOARD UTILITIES
// ============================================================================

async function safeClipboardWrite(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      showSuccessToast('✓ Copied to clipboard!');
      return true;
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (success) {
        showSuccessToast('✓ Copied to clipboard!');
        return true;
      } else {
        throw new Error('Copy command failed');
      }
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    showErrorToast('Failed to copy to clipboard. Please try manual copy.');
    return false;
  }
}

// ============================================================================
// MODAL UTILITIES
// ============================================================================

function safeShowModal(modalId) {
  try {
    const modal = safeGetElement(modalId);
    if (modal) {
      modal.style.display = 'flex';
      // Focus first input in modal
      const firstInput = modal.querySelector('input, textarea, select');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error showing modal ${modalId}:`, error);
    return false;
  }
}

function safeHideModal(modalId) {
  try {
    const modal = safeGetElement(modalId);
    if (modal) {
      modal.style.display = 'none';
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error hiding modal ${modalId}:`, error);
    return false;
  }
}

// ============================================================================
// FORM VALIDATION
// ============================================================================

function validateForm(formId) {
  try {
    const form = safeGetElement(formId);
    if (!form) return { valid: false, errors: ['Form not found'] };
    
    const errors = [];
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
      const value = input.value.trim();
      if (!value) {
        errors.push(`${input.name || input.id || 'Field'} is required`);
        input.classList.add('nb-input-error');
      } else {
        input.classList.remove('nb-input-error');
      }
      
      // Check maxlength
      if (input.maxLength > 0 && value.length > input.maxLength) {
        errors.push(`${input.name || input.id || 'Field'} exceeds maximum length`);
        input.classList.add('nb-input-error');
      }
      
      // Check type-specific validation
      if (input.type === 'number') {
        const num = Number(value);
        const min = Number(input.min);
        const max = Number(input.max);
        
        if (!isNaN(min) && num < min) {
          errors.push(`${input.name || input.id || 'Number'} must be at least ${min}`);
          input.classList.add('nb-input-error');
        }
        
        if (!isNaN(max) && num > max) {
          errors.push(`${input.name || input.id || 'Number'} must be no more than ${max}`);
          input.classList.add('nb-input-error');
        }
      }
    });
    
    return {
      valid: errors.length === 0,
      errors
    };
  } catch (error) {
    console.error('Error validating form:', error);
    return { valid: false, errors: ['Form validation error'] };
  }
}

// ============================================================================
// INITIALIZATION CHECK
// ============================================================================

function checkDOMLoaded() {
  return document.readyState === 'complete' || document.readyState === 'interactive';
}

function onDOMReady(callback) {
  if (checkDOMLoaded()) {
    try {
      callback();
    } catch (error) {
      console.error('Error in DOM ready callback:', error);
      showErrorToast('Application initialization failed. Please refresh.');
    }
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      try {
        callback();
      } catch (error) {
        console.error('Error in DOM ready callback:', error);
        showErrorToast('Application initialization failed. Please refresh.');
      }
    });
  }
}

// ============================================================================
// CONSOLE LOGGER (PRODUCTION SAFE)
// ============================================================================

const logger = {
  log: function(...args) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log(...args);
    }
  },
  warn: function(...args) {
    console.warn(...args);
  },
  error: function(...args) {
    console.error(...args);
  }
};

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

console.log('✅ Error handling and utility infrastructure loaded');

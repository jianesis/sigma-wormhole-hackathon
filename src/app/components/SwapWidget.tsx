import React, { useEffect, useRef } from 'react';
import { clusterApiUrl } from '@solana/web3.js';

interface SwapWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

const SwapWidget: React.FC<SwapWidgetProps> = ({ isOpen, onClose }) => {
    const widgetRef = useRef<HTMLDivElement>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
        const initWidget = () => {
            try {
                if (window.MayanSwap && isOpen) {
                    const widgetContainer = document.getElementById('swap_widget');
                    if (!widgetContainer) return;

                    window.MayanSwap.init('swap_widget', {
                        appIdentity: {
                            name: 'TreeTherium Launchpad',
                            icon: '/favicon.ico',
                            uri: window.location.origin,
                        },
                        rpcs: {
                            solana: clusterApiUrl('devnet'),
                        },
                        sourceChains: ['ethereum', 'base'],
                        destinationChains: ['solana'],
                        tokens: {
                            from: {
                                solana: [],
                                ethereum: [],
                            },
                            to: {
                                solana: [],
                                ethereum: [],
                            },
                        },
                        defaultGasDrop: {
                            solana: 0.04,
                            ethereum: 0.005,
                        },
                        colors: {
                            // Main colors
                            primary: '#2F855A',           // Primary green
                            background: '#1B4332',        // Dark green background
                            mainBox: '#1B4332',          // Widget background

                            // Text and UI colors
                            N900: '#F5F5F5',             // Light text
                            N700: '#E2E8F0',             // Secondary text
                            N600: '#CBD5E0',             // Tertiary text
                            N500: '#A0AEC0',             // Disabled text
                            N300: '#718096',             // Border color
                            N100: '#4A5568',             // Subtle elements
                            N000: '#2D3748',             // Dark elements

                            // Button and interactive elements
                            buttonBackground: '#2F855A',  // Button background
                            primaryGradient: 'linear-gradient(180deg, #2F855A 0%, #1B4332 100%)',

                            // Status colors
                            green: '#48BB78',            // Success
                            lightGreen: '#68D391',       // Success light
                            red: '#F56565',              // Error
                            lightYellow: '#F6E05E',      // Warning

                            // Toast notifications
                            toastBgNatural: '#2F855A',   // Info toast
                            toastBgRed: '#C53030',       // Error toast
                            toastBgGreen: '#2F855A',     // Success toast

                            // Transparent variants
                            tWhiteLight: 'rgba(255, 255, 255, 0.08)',
                            tWhiteBold: 'rgba(255, 255, 255, 0.15)',
                            tBlack: 'rgba(0, 0, 0, 0.08)',
                            tLightBlue: 'rgba(43, 108, 176, 0.12)',
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to initialize Mayan widget:', error);
            }
        };

        const loadScript = () => {
            if (customElements.get('wcm-button')) {
                console.log('Custom elements already defined, proceeding with widget initialization');
                initWidget();
                return;
            }

            if (isOpen && !scriptRef.current) {
                const script = document.createElement('script');
                script.src = "https://cdn.mayan.finance/mayan_widget_v_1_2_0.js";
                script.integrity = "sha256-xg2EIE9pWR7nYXqX9IE+d2Lajrd34w0aKbuJHFH2+aw=";
                script.crossOrigin = "anonymous";
                script.async = true;

                script.onload = initWidget;
                document.body.appendChild(script);
                scriptRef.current = script;
            }
        };

        const timeoutId = setTimeout(loadScript, 100);

        return () => {
            clearTimeout(timeoutId);
            if (scriptRef.current) {
                document.body.removeChild(scriptRef.current);
                scriptRef.current = null;
            }
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
            style={{ zIndex: 9998 }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                ref={widgetRef}
                className="relative"
                style={{
                    zIndex: 9999,
                    width: '480px',
                    height: '640px',
                    marginLeft: '120px'
                }}
            >
                <div
                    id="swap_widget"
                    className="w-full h-full"
                />
            </div>
        </div>
    );
};

export default SwapWidget;

declare global {
    interface Window {
        MayanSwap?: any;
    }
}
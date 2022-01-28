import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Box from '@chakra-ui/react'

const MotionBox = motion(Box)


const items = [
  {
    text: 'Your profile',
    icon: 'fas fa-user'
  },
  {
    text: 'Team',
    icon: 'fas fa-user-friends'
  },
  {
    text: 'Add contact',
    icon: 'fas fa-user-plus'
  },
  {
    text: 'Chats',
    icon: 'fas fa-comment-dots'
  },
  {
    text: false
  },
  {
    text: 'Files',
    icon: 'fas fa-folder'
  },
  {
    text: 'New file',
    icon: 'fas fa-file-medical'
  }
]
const containerVariants = {
  opened: { width: '20rem' },
  closed: { width: '8rem' }
}
const menuItemVariants = {
  initial: {
    opacity: 0
  },
  opened: {
    opacity: 1,
    transition: { 
      duration: .9, 
      ease: 'easeIn'
    }
  },
  closed: {
    opacity: 0,
    transition: {
      duration: .9,
      ease: [.1, 1, .57, 1]
    }
  }
}
const menuIconVariants = {
  opened: i => ({
    x: [0, i*2.4, 0],
  }), 
  closed: i => ({
    x: [0, -i*2.4, 0],
  })
}
const MenuItem = ({ isOpened, i, item: { text, icon } }) => {
  return (
    <MotionBox 
      className="option-container" 
      variants={menuIconVariants}
      custom={i}
      transition={{ duration: .8 }}
    >
      <i className={icon} />
      <AnimatePresence>
        {isOpened && (
          <MotionBox 
            initial="initial"
            variants={menuItemVariants}
          >
            {text}
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>        
  );
}
export default function SideMenu () {
  const [isOpened, setIsOpened] = useState(false);
  const controls = useAnimation();
  return (
    <div className="side-menu">
      <MotionBox 
        className="container"
        initial="closed"
        variants={containerVariants}
        animate={isOpened ? 'opened' : 'closed'}
        transition={{ 
          duration: .8, 
          staggerChildren: .015, 
          staggerDirection: isOpened ? 1 : -1 
        }}
        onMouseOver={() => controls.start({ left: 'calc(100% - 4rem)' })}
        onMouseOut={() => !isOpened && controls.start({ left: 'calc(100% - 6rem)' })} 
      >
        <div className="menu-container" >
          <div className="logo-container">
            <div className="logo-icon">L</div>
            <AnimatePresence>
              {isOpened && (
                <MotionBox variants={menuItemVariants}>
                  <div className="logo-text">Logo</div>
                </MotionBox>
              )}
            </AnimatePresence>
          </div>
          <MotionBox 
            className="search-container" 
            animate={{ background: isOpened ? '#e6e6e6' : '#ffffff' }}
            transition={{ duration: .6 }}
            whileHover={{ 
              background: isOpened ? '#d9d9d9' : '#ffffff',
              transition: { duration: .2 } 
            }}
          >
            <i className="fas fa-search" />
            <AnimatePresence>
              {isOpened && (
                <motion.input 
                  variants={menuItemVariants}
                  placeholder="Search"
                  initial="initial"
                  animate="opened"
                  exit="closed"
                />
              )}
            </AnimatePresence>
          </MotionBox>
          {items.map((item, i) => {
            if (!item.text) return (
              <MotionBox 
                className="line" 
                key={i}
                animate={{ 
                  width: isOpened ? '75%' : '60%',
                  transition: { duration: .8 }
                }}
              />
            )
            return (
              <MenuItem 
                isOpened={isOpened} 
                item={item} 
                i={i+1}
                key={i} 
              />
            )
          })}
        </div>
    
        <MotionBox 
          className="expand-btn-container"
          animate={controls}
          onClick={() => setIsOpened(!isOpened)}
        >
          <motion.i 
            className="fas fa-chevron-up" 
            animate={{ rotate: isOpened ? -135 : 45 }}
          />
        </MotionBox>
      </MotionBox>
    </div>
  )
}

export const SideMenuStyle = () => (
  <Global
    styles={`
      .side-menu {
        height: 100%;
        width: 100%;
        display: grid;
        place-items: center center;
        background: #00cc00;
        .container { 
          height: 80%;
          position: relative;
          .expand-btn-container {
            position: absolute;
            height: 5.5rem;
            width: 5.5rem;
            top: 7rem;
            left: calc(100% - 6rem);
            background: white;
            border-radius: 15px;
            transform: rotate(45deg);
            text-align: right;
            padding-top: 5px;
            padding-right: 6px;
            font-size: 1.8rem;
            z-index: 1;
            cursor: pointer;
          }
          .menu-container {
            height: 100%;
            width: 100%; 
            overflow: hidden;
            background: white;
            display: flex;
            flex-direction: column;
            border-radius: 15px;
            position: relative;
            z-index: 2;
            .logo-container {
              width: 100%;
              background: #009900;
              height: 6rem;
              border-radius: 10px;
              color: #00cc00;
              font-weight: 700;
              font-style: italic;
              pointer-events: none;
              display: flex;
              align-items: center;
              .logo-icon {
                background: white;
                min-width: 4rem;
                height: 4rem;
                border-radius: 50%;
                margin-left: 4rem;
                transform: translateX(-50%);
                text-align: center;
                font-size: 3.6rem;
                display: flex;
                align-items: center;
                padding-left: 1rem;
              }
              .logo-text {
                font-style: normal;
                color: white;
                font-size: 3rem;
                font-weight: 700;
              }
            }
            .search-container {
              margin-top: 1.5rem;
              margin-left: 1rem;
              margin-right: 1rem;
              padding: 1rem 0;
              min-width: 8rem;
              color: #272727;
              font-size: 2.4rem;
              display: grid;
              place-items: center center;
              grid-template-columns: 8rem;
              grid-auto-flow: column;
              grid-auto-columns: min-content;
              border-radius: 10px;
              i {
                padding-right: 2rem;
              }
              input {
                border: none;
                background: none;
                max-width: 11rem;
                font-size: 1.4rem;
                margin-left: -2rem;
                font-family: 'Poppins', sans-serif;
                &:focus {
                  outline: none;
                }
              }
            }
            .option-container {
              padding-top: 1.5rem;
              width: 8rem;
              color: #737373;
              font-size: 2.4rem;
              cursor: pointer;
              transition: all .2s;
              display: grid;
              place-items: center center;
              grid-template-columns: 8rem;
              grid-auto-flow: column;
              grid-auto-columns: min-content;
              &:hover {
                color: #272727;
              }
              div {
                font-size: 1.4rem;
                width: 100%;
                white-space: nowrap;
              }
            }
            .line {
              background: rgba($color: #272727, $alpha: .3);
              width: 60%;
              height: 2px;
              margin: 2rem auto 0 auto;
            }
          }
        }
      }
    `}
  />
)